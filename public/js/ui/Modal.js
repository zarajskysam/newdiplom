/**
 * Класс Modal отвечает за
 * управление всплывающими окнами.
 * В первую очередь это открытие или
 * закрытие имеющихся окон
 * */
class Modal {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if (!element) throw new Error('Element not found');
    this.element = element;
  }

  /**
   * При нажатии на элемент с data-dismiss="modal"
   * должен закрыть текущее окно
   * (с помощью метода Modal.onClose)
   * */
  registerEvents() {
    this.reg = [...this.element.querySelectorAll( 'button[data-dismiss="modal"]' )];
    this.reg.map( element => element.onclick = this.onClose.bind( this ));
  }

  /**
   * Срабатывает после нажатия на элементы, закрывающие окно.
   * Закрывает текущее окно (Modal.close())
   * */
  onClose() {
    this.close();
    this.unregisterEvents();
  }
  /**
   * Удаляет обработчики событий
   * */
  unregisterEvents() {
    this.reg.map( element => element.onclick = '' );
  }
  /**
   * Открывает окно: устанавливает CSS-свойство display
   * со значением «block»
   * */
  open() {
    this.registerEvents();
    this.element.style.display = 'block';
  }
  /**
   * Закрывает окно: удаляет CSS-свойство display
   * */
  close(){
    this.element.style.display = 'none';
  }
}
