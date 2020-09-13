/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  
  static URL = '/user';

  constructor(user, response1) {
    this.user = user;
    this.response1 = response1;
  }


  static setCurrent(user) {
    user = this.user;
    window.localStorage.user = JSON.stringify(user);
  }

  static unsetCurrent() {
    window.localStorage.removeItem('user');
  }

  static current() {
    if(window.localStorage.user) {
      return JSON.parse(window.localStorage.user);
    }
    
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch( data, callback = f => f ) {
    createRequest({
      url: this.URL + '/current',
      data: this.user,
      responseType: 'json',
      method: 'GET',
      callback: (response, err) => {
        this.response1 = response;
      }
   }, callback(this.response1));
  }
  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login( data, callback = f => f ) {
    createRequest({
      url: this.URL + '/login',
      data: data,
      responseType: 'json',
      method: 'POST',
      callback: ( response, user ) => {
        if(response.success) {
          this.user = user;
          this.setCurrent(user);
          App.getForm('login').element.reset();
          App.getModal('login').close();
          App.setState('user-logged');   
        }
      }
   });
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register( data, callback = f => f ) {
    createRequest({
      url: this.URL + '/register',
      data: data,
      responseType: 'json',
      method: 'POST',
      callback: ( response, err ) => {
        if(response.success) {
          this.user = user;
          this.setCurrent(user);
          App.getForm('register').element.reset();
          App.getModal('register').close();
          App.setState('user-logged');
                }
      }
   });
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout( data, callback = f => f ) {
    createRequest({
      url: this.URL + '/logout',
      data: data,
      responseType: 'json',
      method: 'POST',
      callback: ( response, err ) => {
        this.unsetCurrent();
        App.setState( 'init' );
      }
   });
  }
}