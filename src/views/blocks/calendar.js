import styled from 'styled-components';
import Wrapper from 'utils/wrapper';
import calendar from 'assets/calendar.svg';
import {
  backgroundColor,
  dataSourceSettings,
  filter,
} from 'views/configs';
import {blockStateSafeSelector} from 'store/selectors';
import store from 'store';

const Calendar = styled.div`
  & body{
  background: ${(props) => (props.backgroundColor?.indexOf('#') >= 0 ? props.backgroundColor : 'transparent')};
  font-family: sans-serif;
  justify-content:center;
  align-items:center;
  height:100%;
  width:100%;
}
& .calendar{
  justify-content:center;
  align-items:center;
  background: ${(props) => (props.backgroundColor?.indexOf('#') >= 0 ? props.backgroundColor : 'transparent')};
  padding:20px;
  border-radius:5px;
  
  & .month{
    display:flex;
    justify-content:space-between;
    align-items:center;
    font-size:20px;
    margin-bottom:20px;
    font-weight:300;
    color: ${(props) => (props.headerColor?.indexOf('#') >= 0 ? props.headerColor : 'transparent')};
    
    & .year{
      margin-left:10px;
    }
    
    & .nav{
      display:flex;
      justify-content:center;
      align-items:center;
      text-decoration:none;
      color:#0a3d62;
      width:40px;
      height:40px;
      border-radius:40px;
      transition-duration:.2s;
      position:relative;
      
    }
  }
  
  & .days{
    display: grid;
    justify-content:center;
    align-items:center;
    grid-template-columns: repeat(7, 1fr);
    color: ${(props) => (props.titleSelectionColor?.indexOf('#') >= 0 ? props.titleSelectionColor : 'transparent')};
    font-weight:600;
    margin-bottom:15px;
    
    & span{
      width:50px;
      justify-self:center;
      align-self:center;
      text-align:center;
    }
  }
  
  & .dates{
    display:grid;
    grid-template-columns: repeat(7, 1fr);
    
    & button{
      cursor:pointer;
      outline:0;
      border:0;
      background:transparent;
      font-family: sans-serif;
      font-size:16px;
      justify-self:center;
      align-self:center;
      width:50px;
      height:50px;
      border-radius:50px;
      margin:2px;
      transition-duration:.2s;
      
      &.today{
        box-shadow:inset 0px 0px 0px 2px #0a3d62;
        color: ${(props) => (props.todayColor?.indexOf('#') >= 0 ? props.todayColor : 'transparent')};
      }
      
      &:first-child{
        grid-column:3;
      }
      
    }
  }
}
`;

const Component = ({settingsUI, ...props}) => {
  return (
    <Wrapper id={props.id} {...settingsUI} {...props}>
      <Calendar
        {...props}
        {...settingsUI}
        className="draggable"
      >
		<div className="calendar">
  <div className="month"><a href="#" className="nav"><i className="fas fa-angle-left"></i></a><div>January <span className="year">2019</span></div><a href="#" className="nav"><i className="fas fa-angle-right"></i></a></div>
  <div className="days">
    <span>Mon</span>
    <span>Tue</span>
    <span>Wed</span>
    <span>Thu</span>
    <span>Fri</span>
    <span>Sat</span>
    <span>Sun</span>
  </div>
  <div className="dates">
      <button>
        <time>1</time>
      </button>
      <button>
        <time>2</time>
      </button>
      <button>
        <time>3</time>
      </button>
      <button>
        <time>4</time>
      </button>
      <button>
        <time>5</time>
      </button>
      <button>
        <time>6</time>
      </button>
      <button>
        <time>7</time>
      </button>
      <button>
        <time>8</time>
      </button>
      <button>
        <time>9</time>
      </button>
      <button>
        <time>10</time>
      </button>
      <button>
        <time>11</time>
      </button>
      <button>
        <time>12</time>
      </button>
      <button>
        <time>13</time>
      </button>
      <button>
        <time>14</time>
      </button>
      <button>
        <time>15</time>
      </button>
      <button>
        <time>16</time>
      </button>
      <button>
        <time>17</time>
      </button>
      <button className="today">
        <time>18</time>
      </button>
      <button>
        <time>19</time>
      </button>
      <button>
        <time>20</time>
      </button>
      <button>
        <time>21</time>
      </button>
      <button>
        <time>22</time>
      </button>
      <button>
        <time>23</time>
      </button>
      <button>
        <time>24</time>
      </button>
      <button>
        <time>25</time>
      </button>
      <button>
        <time>26</time>
      </button>
      <button>
        <time>27</time>
      </button>
      <button>
        <time>28</time>
      </button>
      <button>
        <time>29</time>
      </button>
      <button>
        <time>30</time>
      </button>
      <button>
        <time>31</time>
      </button>
  </div>
</div>
      </Calendar>
    </Wrapper>
  );
};

const block = (state) => {
  const blockState = state || blockStateSafeSelector(store.getState());

  return ({
    Component,
    name: 'CALENDAR',
    title: 'Calendar',
    description: '///',
    previewImageUrl: calendar,
    category: 'Controls',
    defaultInteractiveOptions: {
      dataSource: '',
      filter: {
        id: '',
        applyHere: true, 
        query: [{}],
      },
    },
    defaultData: {
      backgroundColor: '',
    },
    interactive: {
      dataSource: dataSourceSettings.dataSource,
      filtrationBySelectionDateSource: {
        filterDataId: {type: 'string', name: 'Id data source for filter'},
        dateFromQueryKey: {type: 'string', name: 'Date from query key'},
        dateToQueryKey: {type: 'string', name: 'Date to query key'},
      },
      filter: {
        id: filter.id,
        applyHere: filter.applyHere,
        query: {
          key: filter.query.key,
        },
      },
    },
    config: {
      backgroundColor,
      selectionColor: {type: 'color', name: 'Selection color'},
      borderSelectionColor: {type: 'color', name: 'Border selection color'},
      titleSelectionColor: {type: 'color', name: 'Title selection color'},
      todayColor: {type: 'color', name: 'Today color'},
      headerColor: {type: 'color', name: 'Title header color'},
      counterSelectedColor: {type: 'color', name: 'Counter selected color'},
      counterUnselectedColor: {type: 'color', name: 'Counter unselected color'},
      cornerRadius: {type: 'number', name: 'Corner radius'},
      allowMultipleSelection: {
        type: 'select', name: 'Allow Multiple Selection', options: [
          {label: 'True', value: true},
          {label: 'False', value: false}
        ]
      },
    },
  });
};

export default block;
