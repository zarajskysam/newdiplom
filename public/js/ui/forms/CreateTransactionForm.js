/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * Наследуется от AsyncForm
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor( element ) {
    super ( element );
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    this.select = this.element.querySelector('.accounts-select');
    Account.list( User.current(), response => {
      this.select.innerHTML = '';
      for (let key in response) {
        this.select.insertAdjacentHTML('beforeend', `<option value="${ response[key].id }">${ response[key].name }</option>`);
      }
    });
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit( options ) {
    Transaction.create( options, () => {
      this.element.reset();
      new Modal( this.element.closest( '.modal' )).close();
      App.update();
    });
  }
}
