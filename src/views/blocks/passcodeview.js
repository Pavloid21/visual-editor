import styled from 'styled-components';
import Wrapper from 'utils/wrapper';
import passcodeview from 'assets/passcodeview.svg';
import {hexToRgb} from 'constants/utils';
import {
  backgroundColor,
  fontSize,
  fontWeight,
  getSizeConfig,
  padding,
  shadowConfigBuilder,
  shapeConfigBuilder,
  textAlignment, 
  textColor,
  distribution,
  spacing,
  alignmentConfig,
  borderColor,
  borderWidth,
  buttonImagePadding,
} from 'views/configs';
import {blockStateSafeSelector} from 'store/selectors';
import {getDimensionStyles} from 'views/utils/styles/size';
import store from 'store';
import {transformHexWeb} from '../../utils/color';

const Passcodeview = styled.div`
	& .table {
	display: table;
	height: 100%;
	width: 100%;
	position: relative;
	}

	.cell {
	  display: table-cell;
	  vertical-align: middle;
	  position: relative;
	  width: 100%;
	  text-align: center;
	}


	/*------
	# Pincode
	----*/

	#pincode {
	  position: fixed;
	  overflow: hidden;
	  height: 667px;
	  width: 375px;
	  z-index: 9999;
	  background-color: #272a2f;
	  color: #fff;
	  border-radius: 10px;
	  text-align: center;
	  -webkit-box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.6);
	  -moz-box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.6);
	  box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.6);
	  top: 50%;
	  left: 50%;
	  margin-top: -335px;
	  /* Negative half of height. */
	  margin-left: -188px;
	  /* Negative half of width. */
	}

	#numbers {
	  max-width: 300px;
	  padding: 0 20px;
	  margin: 0 auto;
	  position: relative;
	  display: block;
	  -webkit-transition: all 1s ease-out;
	  -moz-transition: all 1s ease-out;
	  transition: all 1s ease-out;
	  opacity: 1;
	}

	#pincode button {
	  width: 70px;
	  height: 70px;
	  margin-bottom: 10px;
	  background-color: rgba(0, 0, 0, 0.35);
	  border: 0;
	  color: #fff;
	  font-size: 25px;
	  line-height: 50px;
	  border-radius: 100%;
	  opacity: 1;
	  outline: 0;
	  border: 2px solid #272a2f;
	}

	#fields {
	  max-width: 200px;
	  padding: 0 20px;
	  margin: 50px auto;
	  position: relative;
	  display: block;
	}

	#fields .numberfield span {
	${(props) => getDimensionStyles(props.interactive?.dottedPassCodeStackSettings?.dotSettings)
		.width()
		.height()
		.apply()
	}
	  background-color: ${(props) => transformHexWeb(props.interactive?.dottedPassCodeStackSettings?.dotSettings?.backgroundColor || 'transparent')};
	${(props) => {
		if (props.interactive?.dottedPassCodeStackSettings?.dotSettings?.shape?.type === 'ALLCORNERSROUND') {
			return `border-radius: ${props.interactive.dottedPassCodeStackSettings.dotSettings.shape.radius}px;`;
		}
		}}
	  border-width: ${(props) => props.interactive?.dottedPassCodeStackSettings?.dotSettings?.borderWidth || 0}px;
	  border-color: ${(props) => transformHexWeb(props.interactive?.dottedPassCodeStackSettings?.dotSettings?.borderColor || 'transparent')};
	  position: relative;
	  display: inline-block;
	}


	/*------
	# Toast Grid
	----*/

	.grid {
	  list-style: none;
	  margin-left: -20px;
	}

	.grid__col--1-of-3 {
	  width: 33.33333%;
	}

	.grid__col--1-of-4 {
	  width: 25%;
	}

	.grid__col {
	  box-sizing: border-box;
	  display: inline-block;
	  margin-right: -.25em;
	  min-height: 1px;
	  padding-left: 20px;
	  vertical-align: top;
	}

	.label {
	  box-sizing: border-box;
	  display: flex;
	  width: fit-content;
	  align-self: center;
	  ${({props}) => {
		if (props.interactive?.topTitleLabelSettings?.shape?.type === 'ALLCORNERSROUND') {
			return `border-radius: ${props.interactive.topTitleLabelSettings.shape.radius}px;`;
		}
		}}
	  overflow: hidden;
	  ${(props) => {
		if (props.interactive?.topTitleLabelSettings?.shadow) {
			const webColor = transformHexWeb(props.interactive?.topTitleLabelSettings?.shadow?.color);
			const RGB = hexToRgb(webColor);

			return `box-shadow: ${props.interactive?.topTitleLabelSettings?.shadow?.offsetSize?.width}px ${props.interactive?.topTitleLabelSettings?.shadow?.offsetSize?.height}px ${
			props.interactive?.topTitleLabelSettings?.shadow?.radius
			}px rgba(${RGB.r}, ${RGB.g}, ${RGB.b}, ${props.interactive?.topTitleLabelSettings?.shadow?.opacity});`;
		}
		}}
	  & > span {
		display: block;
		text-align: ${(props) => props.interactive?.topTitleLabelSettings?.textAlignment || 'left'};
		color: ${(props) => transformHexWeb(props.interactive?.topTitleLabelSettings?.textColor || 'transparent')};
		background-color: ${(props) => transformHexWeb(props.interactive?.topTitleLabelSettings?.backgroundColor || 'transparent')};
		font-weight: ${(props) => {
			switch (props.interactive?.topTitleLabelSettings?.fontWeight) {
				case 'THIN':
					return 100;
				case 'ULTALIGHT':
					return 200;
				case 'LIGHT':
					return 300;
				case 'REGULAR':
					return 400;
				case 'MEDIUM':
					return 500;
				case 'SEMIBOLD':
					return 600;
				case 'BOLD':
					return 700;
				case 'BLACK':
					return 800;
				case 'HEAVY':
					return 900;
				default:
					return 400;
			}
		}};
		${(props) => getDimensionStyles(props.interactive?.topTitleLabelSettings)
			.width()
			.height()
			.padding()
			.fontSize()
			.apply()
		}
	  }
	}
`;

const Component = ({settingsUI, ...props}) => {
  return (
    <Wrapper id={props.id} {...settingsUI} {...props}>
      <Passcodeview
        {...props}
        {...settingsUI}
        className="draggable"
      >
	  	<div id="pincode">
				<div className="table">
					<div className="cell">
						<div className="label">
							<span>{props.interactive?.topTitleLabelTextStates?.enterCurrentPasscodeMessage}</span>
						</div>
					<div id="fields">
						<div className="grid">
							<div className="grid__col grid__col--1-of-4 numberfield"><span></span></div>
							<div className="grid__col grid__col--1-of-4 numberfield"><span></span></div>
							<div className="grid__col grid__col--1-of-4 numberfield"><span></span></div>
							<div className="grid__col grid__col--1-of-4 numberfield"><span></span></div>
						</div>
					</div>
					<div id="numbers">
						<div className="grid">
							<div className="grid__col grid__col--1-of-3"><button>1</button></div>
							<div className="grid__col grid__col--1-of-3"><button>2</button></div>
							<div className="grid__col grid__col--1-of-3"><button>3</button></div>

							<div className="grid__col grid__col--1-of-3"><button>4</button></div>
							<div className="grid__col grid__col--1-of-3"><button>5</button></div>
							<div className="grid__col grid__col--1-of-3"><button>6</button></div>

							<div className="grid__col grid__col--1-of-3"><button>7</button></div>
							<div className="grid__col grid__col--1-of-3"><button>8</button></div>
							<div className="grid__col grid__col--1-of-3"><button>9</button></div>

							<div className="grid__col grid__col--1-of-3"></div>
							<div className="grid__col grid__col--1-of-3"><button>0</button></div>
							<div className="grid__col grid__col--1-of-3"></div>
						</div>
					</div>
					</div>
				</div>
			</div>
      </Passcodeview>
    </Wrapper>
  );
};

const block = (state) => {
  const blockState = state || blockStateSafeSelector(store.getState());

  return ({
    Component,
    name: 'CALENDAR',
    title: 'Passcodeview',
    description: '...',
    previewImageUrl: passcodeview,
    category: 'Controls',
    defaultInteractiveOptions: {},
    defaultData: {},
    config: {},
	interactive: {
		backgroundColor,
		mode: {
		type: 'select', name: 'Mode', options: [
			{label: 'Create PIN', value: 'create'},
			{label: 'Verify PIN', value: 'verify'}
			]
		},
		topTitleLabelSettings: {
			textAlignment,
			backgroundColor,
			textColor,
			fontSize,
			fontWeight,
			shape: shapeConfigBuilder()
				.withAllCornersRound
				.withRadius
				.done(),
			size: getSizeConfig(blockState.deviceInfo.device),
			padding,
			shadow: shadowConfigBuilder()
				.withRadius
				.done(),
		},
		topTitleLabelTextStates: {
			enterCurrentPasscodeMessage: {type: 'string', name: 'Enter current passcode message'},
			enterSetPasscodeMessage: {type: 'string', name: 'Enter set passcode message'},
			reEnterPasscodeMessage: {type: 'string', name: 'reEnter passcode message'},
			passcodeNotMatchMessage: {type: 'string', name: 'Passcode not match message'},
			enterPasscodeErrorMessage: {type: 'string', name: 'Enter passcode error message'},
			enterPasscodeSuccessMessage: {type: 'string', name: 'Enter passcode success message'},
			biometricTitleMessage: {type: 'string', name: 'Biometric title message'},
			cancelledBiometricButtonMessage: {type: 'string', name: 'Cancelled biometric button message'},
		},
		dottedPassCodeStackSettings: {
			numberOfDots: {type: 'number', name: 'Number of dots'},
			stackContainerSettings: {
				distribution,
				size: getSizeConfig(blockState.deviceInfo.device),
				spacing,
				backgroundColor,
				alignment: alignmentConfig.vertically,
				borderColor,
				borderWidth,
			},
			dotSettings: {
				size: getSizeConfig(blockState.deviceInfo.device),
				backgroundColor,
				borderColor,
				borderWidth,
				shape: shapeConfigBuilder()
					.withAllCornersRound
					.withRadius
					.done(),
				errorColor: {type: 'color', name: 'Error color'},
			},
		},
		pinPadSettings: {
			backgroundColor,
			borderColor,
			borderWidth,
			textColor,
			imagePadding: buttonImagePadding,
			leftImageTintColor: {type: 'color', name: 'Left image color'},
			rightImageTintColor: {type: 'color', name: 'Right image color'},
		},
	},
  });
};

export default block;
