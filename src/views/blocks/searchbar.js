import React from 'react';
import {useDrop} from 'react-dnd';
import styled from 'styled-components';
import {arrayMoveImmutable} from 'array-move';
import {sortableContainer} from 'react-sortable-hoc';
import searchbar from 'assets/searchbar.svg';
import Wrapper from 'utils/wrapper';
import {ItemTypes} from 'constants/actionTypes';
import {observer} from 'utils/observer';
import renderHandlebars from 'utils/renderHandlebars';
import {onSortMove} from 'utils/hooks';
import {
  backgroundColor,
  fontSize,
  getSizeConfig,
  imageUrl,
  placeholder,
  placeholderColor,
  text,
  textAlignment, textColor,
} from 'views/configs';
import {pushBlockInside} from 'store/layout.slice';
import {blockStateSafeSelector} from 'store/selectors';
import store, {useAppDispatch, useAppSelector} from 'store';
import {getDimensionStyles} from 'views/utils/styles/size';

const SearchBar = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 100%;
  align-self: center;
  & > input {
    pointer-events: none;
    &::placeholder {
      color: ${(props) => props.placeholderColor || 'transparent'};
      font-size: 12px;
      font-weight: 400;
    }

    color: ${(props) => props.textColor};
    background-color: ${(props) => props.backgroundColor || 'transparent'};
    ${(props) => getDimensionStyles(props)
      .width()
      .height()
      .apply()
    }
    text-align: ${(props) => props.textAllignment || 'left'};
  }

  &::after {
    content: '';
    display: block;
    ${(props) => getDimensionStyles(props)
      .width()
      .height()
      .apply()
    }
    position: absolute;
    top: 0;
    right: 0;
    mask: url(${(props) => props.imageUrl}) no-repeat center;
    background-position: center;
    background-color: ${(props) => props.textColor || 'transparent'};
    font-size: 12px;
    background-size: cover;
  }
`;

const SortableContainer = sortableContainer(
  ({drop, backgroundColor, listItems, text, placeholder, settingsUI, ...props}) => {
    return (
      <Wrapper id={props.id} {...settingsUI} {...props} style={{maxHeight: '100%'}}>
        <SearchBar
          {...props.settingsUI}
          {...props}
          ref={drop}
          backgroundColor={backgroundColor}
        >
          <input type="text" className="form-control draggable" placeholder={placeholder} value={text} />
          {listItems && renderHandlebars(listItems, 'document2').components}
        </SearchBar>
      </Wrapper>
    );
  }
);

const Component = ({settingsUI, uuid, listItems, ...props}) => {
  const dispatch = useAppDispatch();
  const {layout} = useAppSelector((state) => state);
  const [{canDrop, isOver, target}, drop] = useDrop(() => ({
    accept: ItemTypes.BOX,
    drop: (item) => {
      if (target.isOver()) {
        dispatch(pushBlockInside({
          blockId: item.id,
          uuid,
        }));
      }
      return {
        uuid,
        target: target.targetId,
      };
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({shallow: true}),
      canDrop: monitor.canDrop(),
      target: monitor,
    }),
  }));

  const isActive = canDrop && isOver;
  let backgroundColor = settingsUI.backgroundColor;
  if (isActive) {
    backgroundColor = '#f1f8ff';
  }

  const onSortEnd = ({oldIndex, newIndex, nodes}) => {
    const newOrder = arrayMoveImmutable(nodes, oldIndex, newIndex).map((item) => item.node.getAttribute('id'));
    observer.broadcast({
      layout,
      newOrder,
      parentID: nodes[0].node.parentNode.getAttribute('id'),
      event: 'sorted',
    });
  };

  return (
    <SortableContainer
      drop={drop}
      onSortEnd={onSortEnd}
      listItems={listItems}
      {...settingsUI}
      {...props}
      backgroundColor={backgroundColor}
      distance={1}
      shouldCancelStart={onSortMove}
    />
  );
};

const block = (state) => {
  const blockState = state || blockStateSafeSelector(store.getState());

  return ({
    Component,
    name: 'SEARCHBAR',
    title: 'Search',
    description: 'Search allows users to quickly find app content.',
    previewImageUrl: searchbar,
    imgUrl: 'https://icons.getbootstrap.com/assets/icons/search.svg',
    category: 'Controls',
    defaultData: {
      placeholder: 'Введите имя',
      placeholderColor: '#7F7F7F',
      imageUrl: 'https://icons.getbootstrap.com/assets/icons/search.svg',
      text: 'neo',
      textColor: '#000000',
      backgroundColor: '#FFFFFF',
      size: {
        height: 48,
        width: '',
      },
    },
    config: {
      placeholder,
      imageUrl,
      placeholderColor,
      text,
      textAlignment,
      textColor,
      backgroundColor,
      fontSize,
      size: getSizeConfig(blockState.deviceInfo.device),
    },
  });
};

export default block;
