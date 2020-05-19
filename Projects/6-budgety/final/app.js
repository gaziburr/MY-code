//BUDGET controller
var budgetController = (function () {})();
// UI controller
var UIController = (function () {

  var DomStrings={
    inputType:'.add__type',
    inputDescription:'.add__description',
    inputValue:'.add__value'
 
    }
    





  return {
  getInput:function(){
    
    return{
       type: document.querySelector(DomStrings.inputType).value,
       description: document.querySelector(DomStrings.inputDescription).value,
       value: document.querySelector(DomStrings.inputValue).value
  
    }
  }

  };
})();

//Global controller
var controller = (function (budgetCtrl, UIctrl) {




  var ctrlAddItem = function () {
    //1. Get the filled data
var Input=UIctrl.getInput()
console.log(Input)
    //2. Add the item to the budget controller

    //3. Add the item to the UI

    //4. Calculate the budget

    //5.Display the budget to the UI
  };

  document.querySelector(".add__btn").addEventListener("click", ctrlAddItem);
  document.addEventListener("keypress", function (event) {
    if (event.keyCode === 13 || event.which === 13) {
      ctrlAddItem();
    }
  });
})(budgetController, UIController);

