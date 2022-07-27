import React, {useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import blocks from 'views/blocks';
import {ReactComponent as Trash} from 'assets/trash.svg';
import {leadLetter} from 'constants/utils';
import {Button, Input, UnitsInput, ColorPicker} from 'components/controls';
import {Division, Select} from './Inspector.styled';
import {findInTree} from 'utils';
import {
  addBottomBarItem,
  addTopAppBarItem, changeBlockData,
  changeUnits,
  removeBottomBarItem,
  removeTopAppBarItem, switchElementType,
} from 'store/layout.slice';
import type {TInspector} from './types';
import type {RootStore} from 'store/types';
import {blockStateUnsafeSelector} from 'store/selectors';

const Inspector: React.FC<TInspector> = ({display}) => {
  const dispatch = useDispatch();
  const layout = useSelector((state: RootStore) => state.layout);
  const blockState = useSelector(blockStateUnsafeSelector);
  const handleChangeBlockData = useCallback(
    (blockUuid: string, key: string, value: any, parentKey: string | undefined) => {
      dispatch(changeBlockData({
        blockUuid,
        key,
        parentKey,
        value,
      }));
    },
    [dispatch]
  );

  const handleChangeUnits = useCallback(
    (blockUuid: string, key: string, value: string | undefined, parentKey: string) => {
      dispatch(changeUnits({
        blockUuid,
        key,
        parentKey,
        value,
      }));
    },
    [dispatch]
  );

  const handleChangeElemType = useCallback(
    (blockId: string) => {
      dispatch(switchElementType(blockId));
    },
    [dispatch]
  );

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
                debounceTimeout={500}
                label={config[el].name}
                $isWide
                placeholder={config[el].name}
                value={endpoint ? endpoint[el] : null}
                onChange={(e: any) => handleChangeBlockData(blockUuid, el, e.target.value, parentKey)}
              />
            </div>
          );
        case 'number':
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
                  +e.target.value,
                  parentKey
                )
              }
              select={{
                onChange: (value) =>
                  handleChangeUnits(blockUuid, endpoint[el] !== undefined ? el : el + 'InPercent', value, parentKey),
                options: config[el].options,
                value: endpoint && endpoint[el] === undefined ? '%' : 'px',
              }}
            />
          );
        case 'select':
          return (
            <div className="form-group" key={`${parentKey}_${index}`}>
              <Select
                label={config[el].name}
                onChange={(value) => handleChangeBlockData(blockUuid, el, value, parentKey)}
                options={config[el].options}
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
                  checked={endpoint[el]}
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
      }
      if (endpoint && !Array.isArray(endpoint[el])) {
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

  const blockUuid = layout.selectedBlockUuid;
  const block =
    findInTree(layout.blocks, blockUuid) ||
    (layout.bottomBar?.uuid === blockUuid && layout.bottomBar) ||
    (layout.topAppBar?.uuid === blockUuid && layout.topAppBar);

  if (!block) return null;

  /* @ts-ignore */
  const {config, interactive, complex, name} = blocks[block.blockId](blockState);

  return (
    <div
      style={{
        padding: '8px 16px',
        overflowY: 'auto',
        height: 'calc(100% - 60px)',
      }}
    >
      {interactive && parseConfig(interactive, blockUuid, block.interactive)}
      {complex && <Select label="Element type" options={complex} onChange={handleChangeElemType} value={name} />}
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
          <Button
            onClick={() => {
              dispatch(addBottomBarItem());
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
                        dispatch(removeTopAppBarItem(index));
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
              dispatch(addTopAppBarItem());
            }}
          >
            Add item
          </Button>
        </div>
      )}
    </div>
  );
};

export default Inspector;
