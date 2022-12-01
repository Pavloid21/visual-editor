import React, {SetStateAction} from 'react';
import Loader from 'components/Loader';
import SortableTree from '@nosferatu500/react-sortable-tree';
import FileExplorerTheme from '@nosferatu500/theme-file-explorer';
import {Icon, ScreenTitle} from 'components/LeftSideBar/LeftSideBar.styled';
import {BounceLoader} from 'react-spinners';
import models from 'views/blocks';
import {ReactComponent as Copy} from 'assets/copy.svg';
import {ReactComponent as Trash} from 'assets/trash.svg';
import {css} from '@emotion/react';
import {Container} from 'components/Screens/Screens.styled';
import {useAppSelector} from 'store';

type ScreensProps = {
  loading: boolean,
  treeData: Record<string, any>[],
  setTree: (treeData: SetStateAction<Record<string, any>[]>) => void,
  handleItemClick: (event: React.MouseEvent, extendedNode: Record<string, any>) => void,
  load: undefined | {uuid: string, load: boolean},
  handleCloneScreen: (event: React.MouseEvent, uuid: string) => void,
  handleCloneBlock: (blockUuid: string) => void,
  handleDeleteScreen: (event: React.MouseEvent, node: {uuid: string, endpoint: string, screen: string}) => void,
  handleDeleteBlock: (blockUuid: string) => void
}

const Screens: React.FC<ScreensProps> = ({
  loading,
  treeData,
  setTree,
  handleItemClick,
  load,
  handleCloneScreen,
  handleCloneBlock,
  handleDeleteScreen,
  handleDeleteBlock}) => {
  const {selectedBlockUuid: selectedBlock, selectedScreen} = useAppSelector((state) => state.layout);
  const screenNameFilter = useAppSelector((state) => state.leftBarMenu.screenNameFilter);
  const override = css`
    display: inline-block;
    margin: 0 auto;
    border-color: red;
    margin-right: 6px;
  `;

  const regex = new RegExp(screenNameFilter, 'gi');
  const treeDataFilter = treeData.filter((item: any) => item.screen.match(regex));

  return (
    <Container>
      {loading ? (
        <Loader loading={true} size={40} />
      ) : (
        <SortableTree
          treeData={treeDataFilter}
          onChange={(treeData) => setTree(treeData)}
          theme={FileExplorerTheme}
          generateNodeProps={(extendedNode) => {
            return {
              title: (
                <section
                  className={`node ${
                    selectedBlock === extendedNode.node.subtitle || selectedScreen === extendedNode.node.uuid
                      ? 'node_selected'
                      : ''
                  }`}
                  onClick={async (event) => handleItemClick(event, extendedNode)}
                >
                  <ScreenTitle>
                    {load?.load && load?.uuid === extendedNode.node.uuid ? (
                      <BounceLoader loading={true} size={24} color="#F44532" css={override} />
                    ) : (
                      <Icon src={models[extendedNode.node?.title?.toLowerCase()]?.().previewImageUrl} />
                    )}
                    <span>{extendedNode.node.endpoint || extendedNode.node.title}</span>
                  </ScreenTitle>
                </section>
              ),
              buttons: [
                <Copy
                  key={0}
                  className="icon"
                  onClick={(event) => {
                    extendedNode.node.subtitle === 'screen'
                      ? handleCloneScreen(event, extendedNode.node.uuid)
                      : handleCloneBlock(extendedNode.node.subtitle);
                  }}
                />,
                <Trash
                  key={1}
                  className="icon"
                  onClick={(event) =>
                    extendedNode.node.subtitle === 'screen'
                      ? handleDeleteScreen(event, extendedNode.node)
                      : handleDeleteBlock(extendedNode.node.subtitle)
                  }
                />,
              ],
            };
          }}
        />
      )}
    </Container>
  );
};

export default Screens;
