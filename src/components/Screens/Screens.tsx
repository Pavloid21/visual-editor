import React, {SetStateAction} from 'react';
import Loader from 'components/Loader';
import SortableTree from '@nosferatu500/react-sortable-tree';
import FileExplorerTheme from '@nosferatu500/theme-file-explorer';
import {Icon, ScreenTitle} from 'components/LeftSideBar/LeftSideBar.styled';
import {BounceLoader} from 'react-spinners';
import models from 'views/blocks';
import {css} from '@emotion/react';
import {Container} from 'components/Screens/Screens.styled';
import {useAppSelector} from 'store';
import {Dropdown} from './components/Dropdown';

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
                <Dropdown
                  key={0}
                  handleCloneScreen={handleCloneScreen}
                  handleCloneBlock={handleCloneBlock}
                  handleDeleteScreen={handleDeleteScreen}
                  handleDeleteBlock={handleDeleteBlock}
                  uuid={extendedNode.node.uuid}
                  subtitle={extendedNode.node.subtitle}
                  node={extendedNode.node}
                />
              ],
            };
          }}
        />
      )}
    </Container>
  );
};

export default Screens;
