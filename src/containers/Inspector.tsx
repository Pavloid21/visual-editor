import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import actionTypes from '../constants/actionTypes';
import blocks from '../views/blocks';
import styled from 'styled-components';
import {ReactComponent as Trash} from '../assets/trash.svg';
import ColorPicker from '../components/ColorPicker';
import {leadLetter} from '../constants/utils';
import {Button, Input} from '../components/controls';
import {Select as SelectBase} from '../components/controls';
import {Container} from '../components/controls/Input';
import {Label} from 'components/Input';
import {useDispatch} from 'react-redux';
import {Store} from 'reducers/types';

const Division = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e6e6e6;
  margin-bottom: 8px;
`;

const Select = styled(SelectBase)`
  svg {
    position: static;
  }
  [class$='control'] {
    border-color: var(--neo-gray) !important;
    font-size: 14px;
    min-height: 36px;
    & > div:first-child {
      padding: 0 12px;
    }
    & > div:last-child {
      max-height: 36px;
    }
  }
`;

const Inspector: React.FC<any> = ({display}) => {
  const dispatch = useDispatch();
  const layout = useSelector((state: Store) => state.layout);
  const handleChangeBlockData = (blockUuid: string, key: string, value: any, parentKey: string | undefined) => {
    dispatch({
      type: actionTypes.CHANGE_BLOCK_DATA,
      blockUuid,
      key,
      parentKey,
      value,
    });
  };

  const handleChangeElemType = (blockId: string) => {
    dispatch({
      type: actionTypes.SWITCH_ELEMENT_TYPE,
      blockId,
    });
  };

  const parseConfig = (config: any, blockUuid: string, endpoint: any, parentKey?: any) => {
    return Object.keys(config).map((el: string, index: number) => {
      if (config[el].type === 'string') {
        return (
          <div key={`${parentKey}_${index}`}>
            <Input
              isWide
              clearable
              label={config[el].name}
              type="text"
              placeholder={config[el].name}
              value={endpoint ? endpoint[el] : null}
              onChange={(e) => handleChangeBlockData(blockUuid, el, e.target.value, parentKey)}
            />
          </div>
        );
      } else if (config[el].type === 'color') {
        return (
          <div className="form-group" key={`${parentKey}_${index}`}>
            <ColorPicker
              debounceTimeout={500}
              label={config[el].name}
              isWide
              placeholder={config[el].name}
              value={endpoint ? endpoint[el] : null}
              onChange={(e: any) => handleChangeBlockData(blockUuid, el, e.target.value, parentKey)}
            />
          </div>
        );
      } else if (config[el].type === 'number') {
        return (
          <div className="form-group" key={`${parentKey}_${index}`}>
            <Input
              isWide
              clearable={false}
              label={config[el].name}
              type="number"
              className="form-control"
              placeholder={config[el].name}
              value={endpoint ? endpoint[el] : null}
              onChange={(e) => handleChangeBlockData(blockUuid, el, e.target.value, parentKey)}
            />
          </div>
        );
      } else if (config[el].type === 'boolean') {
        return (
          <div className="form-check" key={`${parentKey}_${index}`}>
            <label>
              <input
                type={'checkbox'}
                className="form-check-input"
                checked={endpoint[el]}
                onChange={(e) => handleChangeBlockData(blockUuid, el, e.target.checked, parentKey)}
              />
              {config[el].name}
            </label>
          </div>
        );
      } else if (config[el].type === 'array') {
        return (
          <div className="form-group" key={`${parentKey}_${index}`}>
            <Input
              isWide
              clearable
              label={config[el].name}
              type="text"
              placeholder={config[el].name}
              value={endpoint ? endpoint[el]?.join(',') : null}
              onChange={(e) => {
                const toArray = e.target.value.replace(/s/g, '').split(',');
                return handleChangeBlockData(blockUuid, el, toArray, parentKey);
              }}
            />
          </div>
        );
      } else if (endpoint && !Array.isArray(endpoint[el])) {
        return (
          <section>
            <Division style={{marginTop: '16px'}}>
              <span>{leadLetter(el)}</span>
            </Division>
            {parseConfig(config[el], blockUuid, endpoint[el], el)}
          </section>
        );
      }
    });
  };

  if (!display) return null;

  const findInTree = (tree: any, uuid: string): any => {
    let result = null;
    for (let item of tree) {
      if (item && item.uuid === uuid) {
        result = item;
      }
      if (!result && item && item.listItems) {
        result = findInTree(item.listItems, uuid);
      }
    }
    return result;
  };

  const blockUuid = layout.selectedBlockUuid;
  const block =
    findInTree(layout.blocks, blockUuid) ||
    (layout.bottomBar?.uuid === blockUuid && layout.bottomBar) ||
    (layout.topAppBar?.uuid === blockUuid && layout.topAppBar);

  if (!block) return null;

  /* @ts-ignore */
  const {config, interactive, complex, name} = blocks[block.blockId];

  return (
    <div
      style={{
        padding: '8px 16px',
        overflowY: 'auto',
        height: 'calc(100% - 60px)',
      }}
    >
      {interactive && parseConfig(interactive, blockUuid, block.interactive)}
      {complex && (
        <Container>
          <Label>Element type</Label>
          <Select options={complex} onChange={handleChangeElemType} value={name} />
        </Container>
      )}
      {parseConfig(config, blockUuid, block.settingsUI)}
      {block.settingsUI.navigationItems && (
        <div>
          <Division>
            <span>Navigation items</span>
          </Division>
          {block.settingsUI.navigationItems.map((element: any, index: number) => {
            return (
              <div key={`navItem_${index}`}>
                <Division>
                  <span>Button {index + 1}</span>
                  <Trash
                    className="icon"
                    onClick={(e) => {
                      dispatch({
                        type: actionTypes.REMOVE_BOTTOMBAR_ITEM,
                        index,
                      });
                    }}
                  />
                </Division>
                {parseConfig(config.navigationItems[0], blockUuid, block.settingsUI.navigationItems[index], [
                  index,
                  'navigationItems',
                ])}
                <hr />
              </div>
            );
          })}
          <Button
            onClick={() => {
              dispatch({
                type: actionTypes.ADD_BOTTOMBAR_ITEM,
              });
            }}
          >
            Add item
          </Button>
        </div>
      )}
      {block.settingsUI.topAppBarItems && (
        <div>
          <Division>
            <span>App bar items</span>
          </Division>
          {block.settingsUI.topAppBarItems.map((element: any, index: number) => {
            return (
              <div key={`navItem_${index}`}>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                  <Division>
                    <span>Button {index + 1}</span>
                    <Trash
                      className="icon"
                      onClick={(e) => {
                        dispatch({
                          type: actionTypes.REMOVE_TOPAPPBAR_ITEM,
                          index,
                        });
                      }}
                    />
                  </Division>
                </div>
                {parseConfig(config.topAppBarItems[0], blockUuid, block.settingsUI.topAppBarItems[index], [
                  index,
                  'topAppBarItems',
                ])}
              </div>
            );
          })}
          <Button
            onClick={() => {
              dispatch({
                type: actionTypes.ADD_TOPAPPBAR_ITEM,
              });
            }}
          >
            Add item
          </Button>
        </div>
      )}
    </div>
  );
};

Inspector.propTypes = {
  layout: PropTypes.object,
  display: PropTypes.bool,
};

export default Inspector;
