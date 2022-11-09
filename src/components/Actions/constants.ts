export const DROPDOWN_VALUES = {
  DELETE: 'Delete',
  COPY: 'Copy'
};

export const ACTION_TEMPLATES = {
  DATA_USAGE: `
/* Отсутствует jwt токен, в мобилку возвращаем статус ответа 401
if (!jwt) {
    res.statusCode = 401;
    return {}};
*/

/* Описание логики снипета data, при получении данных из внешней системы
const user = await api.get("http://domen.ru/users/", {
 "headers": {authorization: req.header('authorization')},
 "params": {},
 validateStatus: (status) => true
})
const map = user.json.data.map(item => ({fio:item.lastName + "\\n" + item.firstName, userId:item.id, userLogin:item.login}))
*/

/* Объект user вернут статус 401, в мобилку возвращаем статус ответа 401
if (user.status == 401) {
    res.statusCode = user.status;
    return {}};
*/

/* Объект user вернут статус 402 или больше, в мобилку возвращаем статус ответа 500
if (user.status >= 402) {
    res.statusCode = 500;
    return {}};
*/

/* содержимое response для мобилки (из внешней системы)
return {
    values: map
}
*/

/* содержимое response для мобилки (без использования внешней системы)
return {
 "values": [
    {
      "key1": "value1",
      "key2": "value2"
    },
    {
      "key1": "value1",
      "key2": "value2"
    }
  ]
}
*/
  `,
  CASTOM_ACTION: `
/* Отсутствует jwt токен, в мобилку возвращаем статус ответа 401
if (!jwt) {
    res.statusCode = 401;
    return {}};
*/

/* Описание логики снипета action
const json = req.body
const response = await api.post("http://domen.ru/auth/login", JSON.stringify(json), {
  "headers" : {"Content-Type": "application/json"},
   validateStatus: (status) => true
})
const jsonResponse = response.json;
*/

/* Объект user вернут статус 401, в мобилку возвращаем статус ответа 401
if (user.status == 401) {
    res.statusCode = user.status;
    return {}};
*/

/* Объект user вернут статус 402 или больше, в мобилку возвращаем статус ответа 500
if (user.status >= 402) {
    res.statusCode = 500;
    return {}};
*/

/* содержимое response для мобилки (для аутентификации)
return {
    accessToken: jsonResponse.accessToken,
    url: "screens/main",
    deviceToken: {
        isLoadFirebase: false,
       url: "push/tokens"
    }
}
*/

/* содержимое response для мобилки (при сохранении/изменении данных во внешних системах для перехода на другую форму)
return {
    url: "screens/main"
}
*/
  `,
  EXTERNAL_ACTION: `
//Пуш уведомление может выть отправлено 2 способами: 1) через вызов api из внешней системы; 2) через cron task, настроенного через интерфейс системы

/* Формирование и отправка пуш уведомления по конкретному пользователю (userId) из входящего запроса внешней системы
const message = {
    "notification": {
        "body": "Body text",
        "title": "Title text"
    }
}
const result = await push(req.query.userId, message)
return {"result": result}
*/

/* Формирование и отправка пуш уведомления в указанный топик (my_topic)
const message = {
    "notification": {
        "body": "Body text",
        "title": "Title text"
    }
}
const result = await pushToTopic('my_topic', message)
return {"result": result}
*/
  `,
};
