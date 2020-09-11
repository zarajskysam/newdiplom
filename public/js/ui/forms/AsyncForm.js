/**
 * Класс AsyncForm управляет всеми формами
 * приложения, которые не должны быть отправлены с
 * перезагрузкой страницы. Вместо этого данные
 * с таких форм собираются и передаются в метод onSubmit
 * для последующей обработки
 * */
class AsyncForm {
  constructor(element) {
    if (!element) throw new Error( 'Ошибка, нет элемента!' );
    this.element = element;
    this.registerEvents();
  }

  registerEvents() {
    this.element.onsubmit = (event) => {
      event.preventDefault();
      this.submit();
    }
  }

  getData() {
    let someForm = this.element.querySelectorAll('.form-control');
    let formData = {};
    for(let key of someForm) {
      formData[key.name] = key.value;
      key.value = '';
    };
    formData.type = this.element.querySelector('input').value;
    if(User.current()){
      formData.user_id = User.current().id;
    };
    return formData;
  }

  onSubmit(options) {

  }

  /**
   * Вызывает метод onSubmit и передаёт туда
   * данные, полученные из метода getData()
   * */
  submit() {
    this.onSubmit(this.getData());
  }
}

