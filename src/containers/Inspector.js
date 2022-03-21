import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import actionTypes from "../constants/actionTypes";
import blocks from "../views/blocks";
import styled from "styled-components";
import Input from "../components/Input";
import { ReactComponent as Trash } from "../assets/trash.svg";
import ColorPicker from "../components/ColorPicker";
import { leadLetter } from "../constants/utils";
import Button from "../components/Button";

const Division = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e6e6e6;
  margin-bottom: 8px;
`;

class Inspector extends Component {
  constructor(props) {
    super(props);

    this.handleChangeBlockData = this.handleChangeBlockData.bind(this);
    this.handleDeleteBlock = this.handleDeleteBlock.bind(this);
    this.parseConfig = this.parseConfig.bind(this);
  }

  handleChangeBlockData(blockUuid, key, value, parentKey) {
    this.props.dispatch({
      type: actionTypes.CHANGE_BLOCK_DATA,
      blockUuid,
      key,
      parentKey,
      value,
    });
  }

  handleDeleteBlock(blockUuid) {
    this.props.dispatch({
      type: actionTypes.DELETE_BLOCK,
      blockUuid,
    });
  }

  parseConfig(config, blockUuid, endpoint, parentKey) {
    return Object.keys(config).map((el, index) => {
      if (config[el].type === "string") {
        return (
          <div key={`${parentKey}_${index}`}>
            <Input
              isWide
              clearable
              label={config[el].name}
              debounceTimeout={500}
              type="text"
              placeholder={config[el].name}
              value={endpoint ? endpoint[el] : null}
              onChange={(e) =>
                this.handleChangeBlockData(
                  blockUuid,
                  el,
                  e.target.value,
                  parentKey
                )
              }
            />
          </div>
        );
      } else if (config[el].type === "color") {
        return (
          <div className="form-group" key={`${parentKey}_${index}`}>
            <ColorPicker
              debounceTimeout={500}
              label={config[el].name}
              isWide
              placeholder={config[el].name}
              value={endpoint ? endpoint[el] : null}
              onChange={(e) =>
                this.handleChangeBlockData(
                  blockUuid,
                  el,
                  e.target.value,
                  parentKey
                )
              }
            />
          </div>
        );
      } else if (config[el].type === "number") {
        return (
          <div className="form-group" key={`${parentKey}_${index}`}>
            <Input
              isWide
              label={config[el].name}
              debounceTimeout={500}
              type="number"
              className="form-control"
              placeholder={config[el].name}
              value={endpoint ? endpoint[el] : null}
              onChange={(e) =>
                this.handleChangeBlockData(
                  blockUuid,
                  el,
                  e.target.value,
                  parentKey
                )
              }
            />
          </div>
        );
      } else if (config[el].type === "boolean") {
        return (
          <div className="form-check" key={`${parentKey}_${index}`}>
            <label>
              <input
                type={"checkbox"}
                className="form-check-input"
                checked={endpoint[el]}
                onChange={(e) =>
                  this.handleChangeBlockData(
                    blockUuid,
                    el,
                    e.target.checked,
                    parentKey
                  )
                }
              />
              {config[el].name}
            </label>
          </div>
        );
      } else if (endpoint && !Array.isArray(endpoint[el])) {
        return (
          <section>
            <Division style={{ marginTop: "16px" }}>
              <span>{leadLetter(el)}</span>
            </Division>
            {this.parseConfig(config[el], blockUuid, endpoint[el], el)}
          </section>
        );
      }
    });
  }

  render() {
    if (!this.props.display) return null;

    const findInTree = (tree, uuid) => {
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

    const blockUuid = this.props.layout.selectedBlockUuid;
    const block =
      findInTree(this.props.layout.blocks, blockUuid) ||
      (this.props.layout.bottomBar?.uuid === blockUuid &&
        this.props.layout.bottomBar) ||
      (this.props.layout.appBar?.uuid === blockUuid &&
        this.props.layout.appBar);

    if (!block) return null;

    const { config, interactive } = blocks[block.blockId];

    return (
      <div
        style={{
          padding: "8px 16px",
          overflowY: "auto",
          height: "calc(100% - 60px)",
        }}
      >
        {interactive && this.parseConfig(interactive, blockUuid, block.interactive)}
        {this.parseConfig(config, blockUuid, block.settingsUI)}
        {block.settingsUI.navigationItems && (
          <div>
            <Division>
              <span>Navigation items</span>
            </Division>
            {block.settingsUI.navigationItems.map((element, index) => {
              return (
                <div key={`navItem_${index}`}>
                  <Division>
                    <span>Button {index + 1}</span>
                    <Trash
                      className="icon"
                      onClick={(e) => {
                        this.props.dispatch({
                          type: actionTypes.REMOVE_BOTTOMBAR_ITEM,
                          index,
                        });
                      }}
                    />
                  </Division>
                  {this.parseConfig(
                    config.navigationItems[0],
                    blockUuid,
                    block.settingsUI.navigationItems[index],
                    [index, "navigationItems"]
                  )}
                  <hr />
                </div>
              );
            })}
            <Button
              onClick={() => {
                this.props.dispatch({
                  type: actionTypes.ADD_BOTTOMBAR_ITEM,
                });
              }}
            >
              Add item
            </Button>
          </div>
        )}
        {block.settingsUI.appBarItems && (
          <div>
            <Division>
              <span>App bar items</span>
            </Division>
            {block.settingsUI.appBarItems.map((element, index) => {
              return (
                <div key={`navItem_${index}`}>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Division>
                      <span>Button {index + 1}</span>
                      <Trash
                        className="icon"
                        onClick={(e) => {
                          this.props.dispatch({
                            type: actionTypes.REMOVE_TOPAPPBAR_ITEM,
                            index,
                          });
                        }}
                      />
                    </Division>
                  </div>
                  {this.parseConfig(
                    config.appBarItems[0],
                    blockUuid,
                    block.settingsUI.appBarItems[index],
                    [index, "appBarItems"]
                  )}
                </div>
              );
            })}
            <Button
              onClick={() => {
                this.props.dispatch({
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
  }
}

export const RemoveButton = styled.span`
  color: red;
  &:hover {
    cursor: pointer;
  }
`;

Inspector.propTypes = {
  layout: PropTypes.object,
  display: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    layout: state.layout,
  };
};

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Inspector);
