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

  constructor(list) {
    this.list1 = list1;
    this.get1 = get1;
  }

  static list( data, callback = f => f) {
    return createRequest({
      url: this.URL,
      data: data,
      method: 'GET',
      responseType: 'json',
      callback: ( response, err ) => {
        this.list1 = response.data;
      }
   }, callback(this.list1));
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
        this.get1 = response;
      }
   }, callback(this.get1));
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

