import React, {useCallback} from 'react';
import {useAppDispatch, useAppSelector} from 'store';
import blocks from 'views/blocks';
import {ReactComponent as Trash} from 'assets/trash.svg';
import {leadLetter} from 'constants/utils';
import {Input, UnitsInput, ColorPicker} from 'components/controls';
import {Division, GroupedFields, Select} from './Inspector.styled';
import {ReactComponent as Plus} from 'assets/plus.svg';
import {findInTree} from 'utils';
import {
  addBottomBarItem,
  changeBlockData,
  changeUnits,
  removeBottomBarItem,
  switchElementType,
  removeProperty,
  addTopAppBarButton,
  removeTopAppBarButton,
  addActionField,
  removeActionField,
  changeKeyActionField,
  changeActionURL,
  addFilterQueryItem,
} from 'store/layout.slice';
import type {TInspector} from './types';
import {blockStateUnsafeSelector} from 'store/selectors';
import {getUnitOptionByDevice} from 'utils/units';
import {get, isEmpty} from 'external/lodash';

const Inspector: React.FC<TInspector> = ({display}) => {
  const dispatch = useAppDispatch();
  const {layout} = useAppSelector((state) => state);
  const blockState = useAppSelector(blockStateUnsafeSelector);
  const handleChangeBlockData = useCallback(
    (blockUuid: string, key: string, value: any, parentKey: string | undefined) => {
      dispatch(
        changeBlockData({
          blockUuid,
          key,
          parentKey,
          value,
        })
      );
    },
    [dispatch]
  );

  const removeProp = useCallback(
    (blockUuid: string, key: string, parentKey: string | undefined) => {
      dispatch(
        removeProperty({
          blockUuid,
          key,
          parentKey,
        })
      );
    },
    [dispatch]
  );

  const handleChangeUnits = useCallback(
    (blockUuid: string, key: string, value: string | undefined, parentKey: string) => {
      dispatch(
        changeUnits({
          blockUuid,
          key,
          parentKey,
          value,
        })
      );
    },
    [dispatch]
  );

  const handleChangeElemType = useCallback(
    (blockId: string) => {
      dispatch(switchElementType(blockId));
    },
    [dispatch]
  );

  const handleChangeKeyActionField = useCallback(
    (uuid, index, value, isValue = false) => {
      dispatch(changeKeyActionField(uuid, index, value, isValue));
    },
    [dispatch]
  );

  const handleChangeActionURL = useCallback((uuid, value = '') => {
    dispatch(changeActionURL(uuid, value));
  }, [dispatch]);

  const parseConfig = (config: any, blockUuid: string, endpoint: any, parentKey?: any) => {
    return Object.keys(config).map((el: string, index: number) => {
      switch (config[el].type) {
        case 'string':
          return (
            <div key={`${parentKey}_${index}`}>
              <Input
                $isWide
                $clearable
                label={config[el].name}
                type="text"
                placeholder={config[el].name}
                value={endpoint ? endpoint[el] : null}
                onChange={(e: any) => handleChangeBlockData(blockUuid, el, e.target.value, parentKey)}
              />
            </div>
          );
        case 'color':
          return (
            <div className="form-group" key={`${parentKey}_${index}`}>
              <ColorPicker
                debouncetimeout={500}
                label={config[el].name}
                $isWide
                placeholder={config[el].name}
                value={endpoint ? endpoint[el] : null}
                onChange={(e: any) => handleChangeBlockData(blockUuid, el, e.target.value, parentKey)}
              />
            </div>
          );
        case 'number':
          if (config[el].relations) {
            return Object.keys(config[el].relations).map((keyRelation) => {
              if (config[el].relations[keyRelation].includes(endpoint[keyRelation])) {
                return (
                  <div className="form-group" key={`${parentKey}_${index}`}>
                    <Input
                      $isWide
                      $clearable={false}
                      label={config[el].name}
                      type="number"
                      placeholder={config[el].name}
                      value={endpoint ? endpoint[el] : null}
                      onChange={(e: any) => handleChangeBlockData(blockUuid, el, +e.target.value, parentKey)}
                    />
                  </div>
                );
              } else if (endpoint[el] !== undefined) {
                removeProp(blockUuid, el, parentKey);
              }
            });
          }
          return (
            <div className="form-group" key={`${parentKey}_${index}`}>
              <Input
                $isWide
                $clearable={false}
                label={config[el].name}
                type="number"
                placeholder={config[el].name}
                value={endpoint ? endpoint[el] : null}
                onChange={(e: any) => handleChangeBlockData(blockUuid, el, +e.target.value, parentKey)}
              />
            </div>
          );
        case 'units':
          return (
            <UnitsInput
              key={`${parentKey}_${index}`}
              $isWide
              $clearable={false}
              label={config[el].name}
              type="number"
              placeholder={config[el].name}
              value={endpoint ? endpoint[el] || endpoint[el + 'InPercent'] : null}
              onChange={(e: any) =>
                handleChangeBlockData(
                  blockUuid,
                  endpoint && endpoint[el] !== undefined ? el : el + 'InPercent',
                  !isEmpty(e.target.value) ? +e.target.value : e.target.value,
                  parentKey
                )
              }
              select={{
                onChange: (value) => {
                  handleChangeUnits(blockUuid, el, value?.toString(), parentKey);
                },
                options: config[el].options,
                value:
                  endpoint && endpoint[el] === undefined
                    ? '%'
                    : getUnitOptionByDevice(blockState.deviceInfo.device).value,
              }}
            />
          );
        case 'select':
          return (
            <div className="form-group" key={`${parentKey}_${index}`}>
              <Select
                async={config[el].action_types}
                label={config[el].name}
                onChange={(value) => {
                  el === 'url'
                  ? handleChangeActionURL(blockUuid, value)
                  : handleChangeBlockData(blockUuid, el, value, parentKey);
                }}
                options={config[el].options || []}
                value={endpoint ? endpoint[el] : null}
                clearable
              />
            </div>
          );
        case 'boolean':
          return (
            <div className="form-check" key={`${parentKey}_${index}`}>
              <label>
                <input
                  type={'checkbox'}
                  className="form-check-input"
                  checked={get(endpoint, [el], false)}
                  onChange={(e: any) => handleChangeBlockData(blockUuid, el, e.target.checked, parentKey)}
                />
                {config[el].name}
              </label>
            </div>
          );
        case 'array':
          return (
            <div className="form-group" key={`${parentKey}_${index}`}>
              <Input
                $isWide
                $clearable
                label={config[el].name}
                type="text"
                placeholder={config[el].name}
                value={endpoint ? endpoint[el]?.join(',') : null}
                onChange={(e: any) => {
                  const toArray = e.target.value.replace(/s/g, '').split(',');
                  return handleChangeBlockData(blockUuid, el, toArray, parentKey);
                }}
              />
            </div>
          );
        case 'object':
          return (
            <GroupedFields key={`section_${parentKey}_${index}`}>
              <Division style={{marginTop: '16px'}}>
                <span>{leadLetter(el)}</span>
                <Plus className="icon" onClick={() => dispatch(addActionField(block.uuid))} />
              </Division>
              {block.interactive[parentKey] && Object.keys(block.interactive[parentKey][el] || {}).map((key: any, index: number) => {
                const item = block.interactive[parentKey][el][key];
                return (
                  <Division key={`object_item_${index}`} style={{alignItems: 'end', gap: '12px'}} withoutBorder>
                    <Input
                      $clearable
                      $isWide
                      label="Key"
                      value={key}
                      onChange={(e) => {
                        e.stopPropagation();
                        handleChangeKeyActionField(block.uuid, index, e.target.value);
                      }}
                    />
                    <Input $clearable $isWide label="Value" value={item} onChange={(e) => {
                      e.stopPropagation();
                      handleChangeKeyActionField(block.uuid, index, e.target.value, true);
                    }}/>
                    <Trash
                      className="icon"
                      onClick={(e) => {
                        dispatch(removeActionField(block.uuid, key));
                      }}
                    />
                  </Division>
                );
              })}
            </GroupedFields>
          );
      }
      if (endpoint && !Array.isArray(endpoint[el])) {
        return (
          <GroupedFields key={`section_${parentKey}_${index}`}>
            <Division style={{marginTop: '16px'}}>
              <span>{leadLetter(el)}</span>
            </Division>
            {config[el] && parseConfig(config[el], blockUuid, endpoint[el], el)}
          </GroupedFields>
        );
      }
    });
  };

  if (!display) return null;

  const blockUuid = layout.selectedBlockUuid;
  const block =
    findInTree(layout.blocks, blockUuid) ||
    (layout.bottomBar?.uuid === blockUuid && layout.bottomBar) ||
    (layout.topAppBar?.uuid === blockUuid && layout.topAppBar);

  if (!block || !blocks[block.blockId]) return null;

  /* @ts-ignore */
  const {config, interactive, complex, name} = blocks[block.blockId](blockState);

  return (
    <div
      style={{
        padding: '8px 16px',
        overflowY: 'auto',
        height: 'calc(100% - 60px)',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}
    >
      {interactive && parseConfig(interactive, blockUuid, block.interactive)}
      {complex && <Select label="Input type" options={complex} onChange={handleChangeElemType} value={name} />}
      {parseConfig(config, blockUuid, block.settingsUI)}
      {block.settingsUI?.navigationItems && (
        <div>
          <Division>
            <span>Navigation items</span>
            <Plus
              className="icon"
              onClick={() => {
                dispatch(addBottomBarItem());
              }}
            />
          </Division>
          {block.settingsUI.navigationItems.map((element: any, index: number) => {
            return (
              <div key={`navItem_${index}`}>
                <Division>
                  <span>Button {index + 1}</span>
                  <Trash
                    className="icon"
                    onClick={(e) => {
                      dispatch(removeBottomBarItem(index));
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
        </div>
      )}
      {block.interactive?.rightButtons && (
        <div>
          <Division>
            <span>Right buttons</span>
            <Plus
              className="icon"
              onClick={() => {
                dispatch(addTopAppBarButton());
              }}
            />
          </Division>
          {block.interactive.rightButtons.map((element: any, index: number) => {
            return (
              <div key={`appBarButton_${element.uuid}`}>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                  <Division>
                    <span>Button {index + 1}</span>
                    <Trash
                      className="icon"
                      onClick={() => {
                        dispatch(removeTopAppBarButton(index));
                      }}
                    />
                  </Division>
                </div>
                {parseConfig(interactive.rightButtons[0], blockUuid, block.interactive.rightButtons[index], [
                  index,
                  'rightButtons',
                ])}
              </div>
            );
          })}
        </div>
      )}
      {block.interactive?.query && (
        <div>
          <Division>
            <span>Query items</span>
            <Plus
              className="icon"
              onClick={() => {
                dispatch(addFilterQueryItem());
              }}
            />
          </Division>
          {block.interactive.query.map((element: any, index: number) => {
            return (
              <div key={`queryItem_${element.uuid}`}>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                  <Division>
                    <span>Item {index + 1}</span>
                    <Trash
                      className="icon"
                      onClick={() => {
                        dispatch(removeTopAppBarButton(index));
                      }}
                    />
                  </Division>
                </div>
                {parseConfig(interactive.query[0], blockUuid, block.interactive.query[index], [
                  index,
                  'query',
                ])}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Inspector;
