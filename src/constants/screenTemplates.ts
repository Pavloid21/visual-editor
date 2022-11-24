import {ReactComponent as Blank} from 'assets/templates/blank.svg';
import {ReactComponent as Bars} from 'assets/templates/bars.svg';
import {ReactComponent as List} from 'assets/templates/list.svg';
import {ReactComponent as Cards} from 'assets/templates/cards.svg';
import {ReactComponent as Product} from 'assets/templates/product.svg';
import {ReactComponent as WebView} from 'assets/templates/web.svg';
import {ReactComponent as Grid} from 'assets/templates/grid.svg';

export const screenTemplates = [
  {
    title: 'Blank Screen',
    img: Blank,
    snippet: {
      screen: 'blankScreen',
      listItems: [],
    },
  },
  {
    title: 'Bars',
    img: Bars,
    snippet: {
      screen: 'barsScreen',
      listItems: [],
      topAppBar: {
        type: 'TOPAPPBAR',
        settingsUI: {
          fontSize: 16,
          textColor: '#E9E8EA',
          sizeModifier: 'FULLSIZE',
          backgroundColor: '#423649',
          padding: {
            top: 8,
            bottom: 8,
            left: 16,
            right: 16,
          },

          action: {
            url: 'backScreen',
          },
        },

        action: {
          url: 'nextScreenName',
          target: '',
        },

        appBarItems: {
          title: 'Title',
        },
      },

      bottomBar: {
        type: 'BOTTOMBAR',
        settingsUI: {
          backgroundColor: '#423649',
          bottomIconSelectedColor: '#E9E8EA',
          bottomIconUnselectedColor: '#A29CA6',
          navigationItems: [
            {
              screenName: 'Auth',
              iconUrl: 'https://icons.getbootstrap.com/assets/icons/box-arrow-in-right.svg',
              action: {
                url: 'screenAuth',
                target: '',
              },
            },
            {
              screenName: 'Contacts',
              iconUrl: 'https://icons.getbootstrap.com/assets/icons/person-lines-fill.svg',
              action: {
                url: 'screenContacts',
                target: '',
              },
            },
            {
              screenName: 'Settings',
              iconUrl: 'https://icons.getbootstrap.com/assets/icons/gear.svg',
              action: {
                url: 'screenSettings',
                target: '',
              },
            },
          ],
        },
      },
    },
  },
  {
    title: 'List',
    img: List,
    snippet: {
      screen: 'listScreen',
      listItems: [
        {
          type: 'VSTACK',
          settingsUI: {
            sizeModifier: 'FULLSIZE',
            backgroundColor: '#c6c6c6',
            distribution: '',
            spacing: 0,
            scroll: true,
            borderColor: '#EFEFEF',
            borderWidth: 1,
            padding: {
              top: '100',
              bottom: '100',
              left: '10',
              right: '10',
            },

            shadow: {
              color: '#000000',
              opacity: 0,
              offsetSize: {
                width: 0,
                height: 0,
              },

              radius: 8,
            },
          },

          listItems: [
            {
              type: 'VSTACK',
              settingsUI: {
                sizeModifier: 'FULLSIZE',
                backgroundColor: '#80e3e5',
                distribution: '',
                spacing: 0,
                scroll: false,
                borderColor: '#EFEFEF',
                borderWidth: 1,
                padding: {
                  top: '100',
                  bottom: '100',
                  left: '10',
                  right: '10',
                },

                shadow: {
                  color: '#000000',
                  opacity: 0,
                  offsetSize: {
                    width: 0,
                    height: 0,
                  },

                  radius: 8,
                },
              },

              listItems: [],
            },
            {
              type: 'VSTACK',
              settingsUI: {
                sizeModifier: 'FULLSIZE',
                backgroundColor: '#73f293',
                distribution: '',
                spacing: 0,
                scroll: false,
                borderColor: '#EFEFEF',
                borderWidth: 1,
                padding: {
                  top: '100',
                  bottom: '100',
                  left: '10',
                  right: '10',
                },

                shadow: {
                  color: '#000000',
                  opacity: 0,
                  offsetSize: {
                    width: 0,
                    height: 0,
                  },

                  radius: 8,
                },
              },

              listItems: [],
            },
            {
              type: 'VSTACK',
              settingsUI: {
                sizeModifier: 'FULLSIZE',
                backgroundColor: '#dd4b4b',
                distribution: '',
                spacing: 0,
                scroll: false,
                borderColor: '#EFEFEF',
                borderWidth: 1,
                padding: {
                  top: '100',
                  bottom: '100',
                  left: '10',
                  right: '10',
                },

                shadow: {
                  color: '#000000',
                  opacity: 0,
                  offsetSize: {
                    width: 0,
                    height: 0,
                  },

                  radius: 8,
                },
              },

              listItems: [],
            },
            {
              type: 'VSTACK',
              settingsUI: {
                sizeModifier: 'FULLSIZE',
                backgroundColor: '#bcd855',
                distribution: '',
                spacing: 0,
                scroll: false,
                borderColor: '#EFEFEF',
                borderWidth: 1,
                padding: {
                  top: '100',
                  bottom: '100',
                  left: '10',
                  right: '10',
                },

                shadow: {
                  color: '#000000',
                  opacity: 0,
                  offsetSize: {
                    width: 0,
                    height: 0,
                  },

                  radius: 8,
                },
              },

              listItems: [],
            },
          ],
        },
      ],
    },
  },
  {
    title: 'Cards',
    img: Cards,
    snippet: {
      screen: 'cardsScreen',
      listItems: [
        {
          type: 'VSTACK',
          settingsUI: {
            sizeModifier: 'FULLSIZE',
            backgroundColor: '#FFFFFF',
            distribution: '',
            spacing: 0,
            scroll: false,
            borderColor: '#EFEFEF',
            borderWidth: 1,
            padding: {
              top: '100',
              bottom: '100',
              left: '10',
              right: '10',
            },

            shadow: {
              color: '#000000',
              opacity: 0,
              offsetSize: {
                width: 0,
                height: 0,
              },

              radius: 8,
            },
          },

          listItems: [
            {
              type: 'HSTACK',
              settingsUI: {
                sizeModifier: 'FULLWIDTH',
                backgroundColor: '#FFFFFF',
                distribution: '',
                spacing: 0,
                scroll: false,
                borderColor: '#EFEFEF',
                borderWidth: 0,
                padding: {
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                },

                shadow: {
                  color: '#000000',
                  opacity: 0,
                  offsetSize: {
                    width: 0,
                    height: 0,
                  },

                  radius: 8,
                },
              },

              listItems: [
                {
                  type: 'CARD',
                  settingsUI: {
                    elevation: 3,
                    sizeModifier: 'FULLWIDTH',
                    backgroundColor: '#C6C6C6',
                    spacing: 16,
                    padding: {
                      top: 100,
                      bottom: 100,
                      left: 10,
                      right: 10,
                    },

                    size: {
                      height: 0,
                    },

                    shape: {
                      type: 'ROUND',
                      radius: 20,
                    },

                    shadow: {
                      color: '#000000',
                      opacity: 0.5,
                      offsetSize: {
                        width: 0,
                        height: 0,
                      },
                    },
                  },

                  action: {
                    url: 'nextScreenName',
                    target: '',
                  },

                  listItems: [],
                },
                {
                  type: 'CARD',
                  settingsUI: {
                    elevation: 3,
                    sizeModifier: 'FULLWIDTH',
                    backgroundColor: '#C6C6C6',
                    spacing: 16,
                    padding: {
                      top: 100,
                      bottom: 100,
                      left: 10,
                      right: 10,
                    },

                    size: {
                      height: 0,
                    },

                    shape: {
                      type: 'ROUND',
                      radius: 20,
                    },

                    shadow: {
                      color: '#000000',
                      opacity: 0.5,
                      offsetSize: {
                        width: 0,
                        height: 0,
                      },
                    },
                  },

                  action: {
                    url: 'nextScreenName',
                    target: '',
                  },

                  listItems: [],
                },
              ],
            },
            {
              type: 'HSTACK',
              settingsUI: {
                sizeModifier: 'FULLWIDTH',
                backgroundColor: '#FFFFFF',
                distribution: '',
                spacing: 0,
                scroll: false,
                borderColor: '#EFEFEF',
                borderWidth: 0,
                padding: {
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                },

                shadow: {
                  color: '#000000',
                  opacity: 0,
                  offsetSize: {
                    width: 0,
                    height: 0,
                  },

                  radius: 8,
                },
              },

              listItems: [
                {
                  type: 'CARD',
                  settingsUI: {
                    elevation: 3,
                    sizeModifier: 'FULLWIDTH',
                    backgroundColor: '#C6C6C6',
                    spacing: 16,
                    padding: {
                      top: 100,
                      bottom: 100,
                      left: 10,
                      right: 10,
                    },

                    size: {
                      height: 0,
                    },

                    shape: {
                      type: 'ROUND',
                      radius: 20,
                    },

                    shadow: {
                      color: '#000000',
                      opacity: 0.5,
                      offsetSize: {
                        width: 0,
                        height: 0,
                      },
                    },
                  },

                  action: {
                    url: 'nextScreenName',
                    target: '',
                  },

                  listItems: [],
                },
                {
                  type: 'CARD',
                  settingsUI: {
                    elevation: 3,
                    sizeModifier: 'FULLWIDTH',
                    backgroundColor: '#C6C6C6',
                    spacing: 16,
                    padding: {
                      top: 100,
                      bottom: 100,
                      left: 10,
                      right: 10,
                    },

                    size: {
                      height: 0,
                    },

                    shape: {
                      type: 'ROUND',
                      radius: 20,
                    },

                    shadow: {
                      color: '#000000',
                      opacity: 0.5,
                      offsetSize: {
                        width: 0,
                        height: 0,
                      },
                    },
                  },

                  action: {
                    url: 'nextScreenName',
                    target: '',
                  },

                  listItems: [],
                },
              ],
            },
          ],
        },
      ],

      topAppBar: {
        type: 'TOPAPPBAR',
        settingsUI: {
          fontSize: 16,
          textColor: '#E9E8EA',
          sizeModifier: 'FULLSIZE',
          backgroundColor: '#423649',
          padding: {
            top: 8,
            bottom: 8,
            left: 16,
            right: 16,
          },

          action: {
            url: 'backScreen',
          },
        },

        action: {
          url: 'nextScreenName',
          target: '',
        },

        appBarItems: {
          title: 'Title',
        },
      },

      bottomBar: {
        type: 'BOTTOMBAR',
        settingsUI: {
          backgroundColor: '#423649',
          bottomIconSelectedColor: '#E9E8EA',
          bottomIconUnselectedColor: '#A29CA6',
          navigationItems: [
            {
              screenName: 'Auth',
              iconUrl: 'https://icons.getbootstrap.com/assets/icons/box-arrow-in-right.svg',
              action: {
                url: 'screenAuth',
                target: '',
              },
            },
            {
              screenName: 'Contacts',
              iconUrl: 'https://icons.getbootstrap.com/assets/icons/person-lines-fill.svg',
              action: {
                url: 'screenContacts',
                target: '',
              },
            },
            {
              screenName: 'Settings',
              iconUrl: 'https://icons.getbootstrap.com/assets/icons/gear.svg',
              action: {
                url: 'screenSettings',
                target: '',
              },
            },
          ],
        },
      },
    },
  },
  {
    title: 'Product card',
    img: Product,
    snippet: {
      screen: 'productCardScreen',
      listItems: [
        {
          type: 'VSTACK',
          settingsUI: {
            sizeModifier: 'FULLSIZE',
            backgroundColor: '#FFFFFF',
            distribution: '',
            spacing: 0,
            scroll: false,
            borderColor: '#EFEFEF',
            borderWidth: 0,
            padding: {
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
            },

            shadow: {
              color: '#000000',
              opacity: 0,
              offsetSize: {
                width: 0,
                height: 0,
              },

              radius: 8,
            },
          },

          listItems: [
            {
              type: 'IMAGE',
              settingsUI: {
                sizeModifier: 'FULLWIDTH',
                backgroundColor: '#FFFFFF',
                borderWidth: 0,
                borderColor: '#000000',
                imageUrl:
                  'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
                size: {
                  height: 200,
                  width: 400,
                },

                shape: {
                  type: 'ALLCORNERSROUND',
                  radius: 4,
                },

                shadow: {
                  color: '#000000',
                  opacity: 0.3,
                  offsetSize: {
                    width: 0,
                    height: 0,
                  },

                  radius: 8,
                },
              },
            },
            {
              type: 'HSTACK',
              settingsUI: {
                sizeModifier: 'FULLSIZE',
                backgroundColor: '#FFFFFF',
                distribution: '',
                spacing: 0,
                scroll: false,
                borderColor: '#EFEFEF',
                borderWidth: 0,
                padding: {
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                },

                shadow: {
                  color: '#000000',
                  opacity: 0,
                  offsetSize: {
                    width: 0,
                    height: 0,
                  },

                  radius: 8,
                },
              },

              listItems: [
                {
                  type: 'VSTACK',
                  settingsUI: {
                    sizeModifier: 'FULLSIZE',
                    backgroundColor: '#FFFFFF',
                    distribution: '',
                    spacing: 0,
                    scroll: false,
                    borderColor: '#EFEFEF',
                    borderWidth: 1,
                    padding: {
                      top: '100',
                      bottom: '100',
                      left: '10',
                      right: '10',
                    },

                    shadow: {
                      color: '#000000',
                      opacity: 0,
                      offsetSize: {
                        width: 0,
                        height: 0,
                      },

                      radius: 8,
                    },

                    alignment: 'CENTER',
                  },

                  listItems: [
                    {
                      type: 'LABEL',
                      settingsUI: {
                        sizeModifier: 'FULLWIDTH',
                        text: 'Product name',
                        backgroundColor: '#FFFFFF',
                        textColor: '#000000',
                        fontSize: 36,
                        shape: {
                          radius: '0',
                        },

                        size: {
                          width: 175,
                          height: 50,
                        },

                        padding: {
                          top: 0,
                          bottom: 0,
                          left: 0,
                          right: 0,
                        },

                        fontWeight: 'SEMIBOLD',
                        shadow: {
                          color: '#000000',
                          opacity: 0.3,
                          offsetSize: {
                            width: 0,
                            height: 0,
                          },

                          radius: 8,
                        },
                      },
                    },
                    {
                      type: 'LABEL',
                      settingsUI: {
                        sizeModifier: 'FULLWIDTH',
                        text: 'product description...',
                        backgroundColor: '#FFFFFF',
                        textColor: '#000000',
                        fontSize: 24,
                        shape: {
                          type: 'ALLCORNERSROUND',
                          radius: '0',
                        },

                        size: {
                          width: 175,
                          height: 100,
                        },

                        padding: {
                          top: 0,
                          bottom: 0,
                          left: 0,
                          right: 0,
                        },

                        fontWeight: 'REGULAR',
                        shadow: {
                          color: '#000000',
                          opacity: 0.3,
                          offsetSize: {
                            width: 0,
                            height: 0,
                          },

                          radius: 8,
                        },
                      },
                    },
                    {
                      type: 'LABEL',
                      settingsUI: {
                        sizeModifier: 'FULLWIDTH',
                        text: '99$',
                        backgroundColor: '#FFFFFF',
                        textColor: '#423649',
                        fontSize: 36,
                        shape: {
                          type: 'ALLCORNERSROUND',
                          radius: '0',
                        },

                        size: {
                          width: 175,
                          height: 100,
                        },

                        padding: {
                          top: 0,
                          bottom: 0,
                          left: 0,
                          right: 0,
                        },

                        fontWeight: 'BOLD',
                        shadow: {
                          color: '#000000',
                          opacity: 0.3,
                          offsetSize: {
                            width: 0,
                            height: 0,
                          },

                          radius: 8,
                        },
                      },
                    },
                  ],
                },
                {
                  type: 'VSTACK',
                  settingsUI: {
                    sizeModifier: 'FULLSIZE',
                    backgroundColor: '#FFFFFF',
                    distribution: '',
                    spacing: 0,
                    scroll: false,
                    borderColor: '#EFEFEF',
                    borderWidth: 1,
                    padding: {
                      top: '100',
                      bottom: '100',
                      left: '10',
                      right: '10',
                    },

                    shadow: {
                      color: '#000000',
                      opacity: 0,
                      offsetSize: {
                        width: 0,
                        height: 0,
                      },

                      radius: 8,
                    },
                  },

                  listItems: [
                    {
                      type: 'LABEL',
                      settingsUI: {
                        sizeModifier: 'FULLWIDTH',
                        text: 'Some another text...',
                        backgroundColor: '#FFFFFF',
                        textColor: '#000000',
                        fontSize: 16,
                        shape: {
                          type: 'ALLCORNERSROUND',
                          radius: '0',
                        },

                        size: {
                          width: 175,
                          height: 260,
                        },

                        padding: {
                          top: 0,
                          bottom: 0,
                          left: 0,
                          right: 0,
                        },

                        fontWeight: 'REGULAR',
                        shadow: {
                          color: '#000000',
                          opacity: 0.3,
                          offsetSize: {
                            width: 0,
                            height: 0,
                          },

                          radius: 8,
                        },
                      },
                    },
                    {
                      type: 'BUTTON',
                      settingsUI: {
                        text: 'Buy',
                        fontSize: '24',
                        textColor: '#FFFFFF',
                        backgroundColor: '#F44532',
                        imageUrl: '',
                        borderColor: '#EFEFEF',
                        borderWidth: 1,
                        buttonTextPadding: {
                          top: 16,
                          right: 16,
                          bottom: 16,
                          left: 16,
                        },

                        buttonImagePadding: {
                          top: 16,
                          right: 16,
                          bottom: 16,
                          left: 16,
                        },

                        shape: {
                          type: 'ALLCORNERSROUND',
                          radius: '4',
                        },

                        sizeModifier: 'FULLWIDTH',
                        size: {
                          height: 48,
                          width: 230,
                        },

                        shadow: {
                          color: '#000000',
                          opacity: 0.3,
                          offsetSize: {
                            width: 0,
                            height: 0,
                          },

                          radius: 8,
                        },

                        fontWeight: 'LIGHT',
                        textAlignment: 'CENTER',
                      },

                      action: {
                        url: 'nextScreenName',
                        target: '',
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],

      topAppBar: {
        type: 'TOPAPPBAR',
        settingsUI: {
          fontSize: 16,
          textColor: '#E9E8EA',
          sizeModifier: 'FULLSIZE',
          backgroundColor: '#423649',
          padding: {
            top: 8,
            bottom: 8,
            left: 16,
            right: 16,
          },

          action: {
            url: 'backScreen',
          },
        },

        action: {
          url: 'nextScreenName',
          target: '',
        },

        appBarItems: {
          title: 'Title',
        },
      },

      bottomBar: {
        type: 'BOTTOMBAR',
        settingsUI: {
          backgroundColor: '#423649',
          bottomIconSelectedColor: '#E9E8EA',
          bottomIconUnselectedColor: '#A29CA6',
          navigationItems: [
            {
              screenName: 'Auth',
              iconUrl: 'https://icons.getbootstrap.com/assets/icons/box-arrow-in-right.svg',
              action: {
                url: 'screenAuth',
                target: '',
              },
            },
            {
              screenName: 'Contacts',
              iconUrl: 'https://icons.getbootstrap.com/assets/icons/person-lines-fill.svg',
              action: {
                url: 'screenContacts',
                target: '',
              },
            },
            {
              screenName: 'Settings',
              iconUrl: 'https://icons.getbootstrap.com/assets/icons/gear.svg',
              action: {
                url: 'screenSettings',
                target: '',
              },
            },
          ],
        },
      },
    },
  },
  {
    title: 'WebView',
    img: WebView,
    snippet: {
      screen: 'webView',
      listItems: [
        {
          type: 'VSTACK',
          settingsUI: {
            sizeModifier: 'FULLSIZE',
            backgroundColor: '#FFFFFF',
            spacing: 0,
            scroll: false,
            borderColor: '#FFFFFF',
            borderWidth: 0,
            padding: {
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
            },

            shadow: {
              color: '#000000',
              opacity: 0,
              offsetSize: {
                width: 0,
                height: 0,
              },

              radius: 8,
            },

            alignment: 'CENTER',
          },

          listItems: [
            {
              type: 'WEBVIEW',
              settingsUI: {
                mainSiteHtml: '',
                mainSiteUrl: 'https://build.chromium.org',
              },
            },
          ],
        },
      ],

      topAppBar: {
        type: 'TOPAPPBAR',
        settingsUI: {
          fontSize: 16,
          textColor: '#E9E8EA',
          sizeModifier: 'FULLSIZE',
          backgroundColor: '#423649',
          padding: {
            top: 8,
            bottom: 8,
            left: 16,
            right: 16,
          },

          action: {
            url: 'backScreen',
          },
        },

        action: {
          url: 'nextScreenName',
          target: '',
        },

        appBarItems: {
          title: 'Title',
        },
      },

      bottomBar: {
        type: 'BOTTOMBAR',
        settingsUI: {
          backgroundColor: '#423649',
          bottomIconSelectedColor: '#E9E8EA',
          bottomIconUnselectedColor: '#A29CA6',
          navigationItems: [
            {
              screenName: 'Auth',
              iconUrl: 'https://icons.getbootstrap.com/assets/icons/box-arrow-in-right.svg',
              action: {
                url: 'screenAuth',
                target: '',
              },
            },
            {
              screenName: 'Contacts',
              iconUrl: 'https://icons.getbootstrap.com/assets/icons/person-lines-fill.svg',
              action: {
                url: 'screenContacts',
                target: '',
              },
            },
            {
              screenName: 'Settings',
              iconUrl: 'https://icons.getbootstrap.com/assets/icons/gear.svg',
              action: {
                url: 'screenSettings',
                target: '',
              },
            },
          ],
        },
      },
    },
  },
  {
    title: 'Grid',
    img: Grid,
    snippet: {
      screen: 'gridScreen',
      listItems: [
        {
          type: 'HSTACK',
          settingsUI: {
            sizeModifier: 'FULLSIZE',
            backgroundColor: '#FFFFFF',
            distribution: '',
            spacing: 0,
            scroll: false,
            borderColor: '#EFEFEF',
            borderWidth: 1,
            padding: {
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
            },

            shadow: {
              color: '#000000',
              opacity: 0,
              offsetSize: {
                width: 0,
                height: 0,
              },

              radius: 8,
            },
          },

          listItems: [
            {
              type: 'VSTACK',
              settingsUI: {
                sizeModifier: 'FULLSIZE',
                backgroundColor: '#FFFFFF',
                distribution: '',
                spacing: 12,
                scroll: false,
                borderColor: '#EFEFEF',
                borderWidth: 1,
                padding: {
                  top: '100',
                  bottom: '100',
                  left: '10',
                  right: '10',
                },

                shadow: {
                  color: '#000000',
                  opacity: 0,
                  offsetSize: {
                    width: 0,
                    height: 0,
                  },

                  radius: 8,
                },
              },

              listItems: [
                {
                  type: 'VSTACK',
                  settingsUI: {
                    sizeModifier: 'FULLSIZE',
                    backgroundColor: '#f44532',
                    distribution: '',
                    spacing: 0,
                    scroll: false,
                    borderColor: '#EFEFEF',
                    borderWidth: 1,
                    padding: {
                      top: '100',
                      bottom: '100',
                      left: '10',
                      right: '10',
                    },

                    shadow: {
                      color: '#000000',
                      opacity: 0,
                      offsetSize: {
                        width: 0,
                        height: 0,
                      },

                      radius: 8,
                    },
                  },

                  listItems: [],
                },
                {
                  type: 'VSTACK',
                  settingsUI: {
                    sizeModifier: 'FULLSIZE',
                    backgroundColor: '#f44532',
                    distribution: '',
                    spacing: 0,
                    scroll: false,
                    borderColor: '#EFEFEF',
                    borderWidth: 1,
                    padding: {
                      top: '100',
                      bottom: '100',
                      left: '10',
                      right: '10',
                    },

                    shadow: {
                      color: '#000000',
                      opacity: 0,
                      offsetSize: {
                        width: 0,
                        height: 0,
                      },

                      radius: 8,
                    },
                  },

                  listItems: [],
                },
                {
                  type: 'VSTACK',
                  settingsUI: {
                    sizeModifier: 'FULLSIZE',
                    backgroundColor: '#f44532',
                    distribution: '',
                    spacing: 0,
                    scroll: false,
                    borderColor: '#EFEFEF',
                    borderWidth: 1,
                    padding: {
                      top: '100',
                      bottom: '100',
                      left: '10',
                      right: '10',
                    },

                    shadow: {
                      color: '#000000',
                      opacity: 0,
                      offsetSize: {
                        width: 0,
                        height: 0,
                      },

                      radius: 8,
                    },
                  },

                  listItems: [],
                },
              ],
            },
            {
              type: 'VSTACK',
              settingsUI: {
                sizeModifier: 'FULLSIZE',
                backgroundColor: '#FFFFFF',
                distribution: '',
                spacing: 12,
                scroll: false,
                borderColor: '#EFEFEF',
                borderWidth: 1,
                padding: {
                  top: '100',
                  bottom: '100',
                  left: '10',
                  right: '10',
                },

                shadow: {
                  color: '#000000',
                  opacity: 0,
                  offsetSize: {
                    width: 0,
                    height: 0,
                  },

                  radius: 8,
                },
              },

              listItems: [
                {
                  type: 'VSTACK',
                  settingsUI: {
                    sizeModifier: 'FULLSIZE',
                    backgroundColor: '#f44532',
                    distribution: '',
                    spacing: 0,
                    scroll: false,
                    borderColor: '#EFEFEF',
                    borderWidth: 1,
                    padding: {
                      top: '100',
                      bottom: '100',
                      left: '10',
                      right: '10',
                    },

                    shadow: {
                      color: '#000000',
                      opacity: 0,
                      offsetSize: {
                        width: 0,
                        height: 0,
                      },

                      radius: 8,
                    },
                  },

                  listItems: [],
                },
                {
                  type: 'VSTACK',
                  settingsUI: {
                    sizeModifier: 'FULLSIZE',
                    backgroundColor: '#f44532',
                    distribution: '',
                    spacing: 0,
                    scroll: false,
                    borderColor: '#EFEFEF',
                    borderWidth: 1,
                    padding: {
                      top: '100',
                      bottom: '100',
                      left: '10',
                      right: '10',
                    },

                    shadow: {
                      color: '#000000',
                      opacity: 0,
                      offsetSize: {
                        width: 0,
                        height: 0,
                      },

                      radius: 8,
                    },
                  },

                  listItems: [],
                },
                {
                  type: 'VSTACK',
                  settingsUI: {
                    sizeModifier: 'FULLSIZE',
                    backgroundColor: '#f44532',
                    distribution: '',
                    spacing: 0,
                    scroll: false,
                    borderColor: '#EFEFEF',
                    borderWidth: 1,
                    padding: {
                      top: '100',
                      bottom: '100',
                      left: '10',
                      right: '10',
                    },

                    shadow: {
                      color: '#000000',
                      opacity: 0,
                      offsetSize: {
                        width: 0,
                        height: 0,
                      },

                      radius: 8,
                    },
                  },

                  listItems: [],
                },
              ],
            },
          ],
        },
      ],
    },
  },
];
