/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * */
class Entity {

  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */

  static URL = '';

  constructor(data) {
    this.data = data;
  }

  static list( data, callback = f => f) {
    return createRequest({
      url: this.URL,
      data: data,
      method: 'GET',
      responseType: 'json',
      callback: ( response, err ) => {
        this.data = response.data;
      }
   }, callback(this.data));
  }

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create( data, callback = f => f ) {
    data._method = 'PUT';
    return createRequest({
      url: this.URL,
      data: data,
      method: 'POST',
      responseType: 'json',
      callback: ( response, err ) => {
        
      }
   }, callback());
  }

  /**
   * Получает информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static get( id = '', data, callback = f => f ) {
    return createRequest({
      url: this.URL,
      data: data,
      method: 'GET',
      callback: ( response, err ) => {
        this.data = response.data;
      }
   }, callback(this.data));
  }

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove( id = '', data, callback = f => f ) {
    data._method = 'DELETE'
    return createRequest({
      url: this.URL,
      data: data,
      method: 'POST',
      callback: ( response, err ) => {
        
      }
   }, callback());
  }
}

