function prepareModel(defaultData, endpoint) {
  Object.keys(defaultData).forEach((key) => {
    if (
      typeof defaultData[key] !== "object" ||
      Array.isArray(defaultData[key])
    ) {
      endpoint[key] = defaultData[key];
    } else {
      endpoint[key] = {};
      prepareModel(defaultData[key], endpoint[key]);
    }
  });
}

export function makeid(length) {
  let result = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function getData(defaultData) {
  const result = {};
  prepareModel(defaultData, result);
  return result;
}

export const buildJSONitem = (block, mode) => {
  if (block.settingsUI.checked) {
    delete block.settingsUI.checked;
  }
  const settingsUI = {};
  const interactive = {};
  Object.keys(block.settingsUI).forEach((key) => {
    if (typeof block.settingsUI[key] === "string") {
      settingsUI[key] = `${block.settingsUI[key].replace(/{{|}}/g, "")}`;
    }
    settingsUI[key] = block.settingsUI[key];
  });
  if (block.interactive) {
    Object.keys(block.interactive).forEach((key) => {
      if (typeof block.interactive[key] === "string") {
        interactive[key] = `${block.interactive[key]?.replace(/{{|}}/g, "")}`;
      }
      interactive[key] = block.interactive[key];
    });
  }
  let data = {
    type: block.blockId.toUpperCase(),
    settingsUI,
  };
  if (mode === "code") {
    data = { ...data, ...interactive };
  } else {
    data.interactive = interactive;
  }
  if (block.listItems) {
    data.listItems = block.listItems.map((item) => buildJSONitem(item, mode));
  }
  return data;
};

export const prepareJSON = (initial, layout, topAppBar, bottomBar, mode) => {
  initial.listItems = layout[0]
    ? layout.map((block) => {
        return buildJSONitem(block, mode);
      })
    : [];
  if (topAppBar) {
    initial.topAppBar = buildJSONitem(topAppBar, mode);
  } else {
    delete initial.topAppBar;
  }
  if (bottomBar) {
    initial.bottomBar = buildJSONitem(bottomBar, mode);
  } else {
    delete initial.bottomBar;
  }
};

export const snippet = (
  initial,
  api,
  layout,
  topAppBar,
  bottomBar,
  mode = "edit"
) => {
  const reference = { ...initial };
  if (api) {
    const constants = api.list.map((item) => {
      const headers = item.headers?.map((header) => {
        return `"${header.key}": "${header.value}"`;
      });
      const params = item.params?.map((param) => {
        return `"${param.key}": "${param.value}"`;
      });
      return `const ${item.varName} = await api.get("${item.url}"${
        (headers || params) && `, {`
      }${headers && `"headers": {${headers.join(",")}},`}${
        params && `"params": {${params.join(",")}}`
      }});`;
    });
    prepareJSON(reference, layout, topAppBar, bottomBar, mode);
    let jsonString = JSON.stringify(reference, null, 4);
    constants.push(`return ${jsonString}`);
    return constants.join("\r\n");
  }
};

export const walker = (data, template = {}) => {
  data.forEach((property) => {
    if (property.value.type === "Literal") {
      template[property.key.value] = property.value.value;
    }
    if (property.value.type === "ArrayExpression") {
      template[property.key.value] = property.value.elements.map((element) => {
        if (element.type === "ObjectExpression") {
          return walker(element.properties);
        } else if (element.type === "Literal") {
          return element.value;
        }
      });
    }
    if (property.value.type === "ObjectExpression") {
      template[property.key.value] = walker(property.value.properties);
    }
  });
  return template;
};
