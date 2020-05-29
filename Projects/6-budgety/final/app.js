//BUDGET controller
var budgetController = (function () {
  var Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  var Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var data = {
    allItems: {
      exp: [],
      inc: [],
    },
    totals: {
      exp: 0,
      inc: 0,
    },
  };
  return {
    addItem: function (type, des, val) {
      var newItem, ID;
      //[1 2 3 4 5 ], next ID= 6
      //[1 2 4 6 8], next ID= 9
      //ID= last ID + 1

      //Creating a new ID;
      //Creating a new ID;
      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }
      // Creating a new Item based on "inc" or "exp" type;
      if (type === "exp") {
        newItem = new Expense(ID, des, val);
      } else if (type === "inc") {
        newItem = new Income(ID, des, val);
      }
      // push it into our data structure
      data.allItems[type].push(newItem);
      //Return the new element
      return newItem;
    },
    testing: function () {
      console.log(data);
    },
  };
})();

// UI controller
var UIController = (function () {
  var DomStrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    inputBtn: ".add__btn",
    incomeContainer: ".income__list",
    expensesContainer: ".expenses__list",
  };

  return {
    getInput: function () {
      return {
        type: document.querySelector(DomStrings.inputType).value,
        description: document.querySelector(DomStrings.inputDescription).value,
        value: document.querySelector(DomStrings.inputValue).value,
      };
    },
    /* addListItem: function (obj, type) {
      var html, newHtml, element;
      // Create HTML string with placeholder text

      if (type === "inc") {
        element = DomStrings.incomeContainer;

        html =
          '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else if (type === "exp") {
        element = DomStrings.expensesContainer;

        html =
          '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }

      // Replace the placeholder text with some actual data
      newHtml = html.replace("%id%", obj.id);
      newHtml = newHtml.replace("%description%", obj.description);
      newHtml = newHtml.replace("%value%", obj.value);

      // Insert the HTML into the DOM
      document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);
    }, */
    AddListItem: function (obj, type) {
      var html, newHtml, element;
      // Create HTML string with placeholder text

      if (type === "inc") {
        element = DomStrings.incomeContainer;

        html =
          '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else if (type === "exp") {
        element = DomStrings.expensesContainer;

        html =
          '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }

      // Replace the placeholder text with some actual data
      newHtml = html.replace("%id%", obj.id);
      newHtml = newHtml.replace("%description%", obj.description);
      newHtml = newHtml.replace("%value%", obj.value);
      //Insert the HTML into the DOM
      document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);
      /* document.querySelector(element).insertAdjacentHTML("beforeend", newHtml); */
    },
    getDomStrings: function () {
      return DomStrings;
    },
  };
})();

//Global controller
var controller = (function (budgetCtrl, UIctrl) {
  var setUpEventListeners = function () {
    document.querySelector(DOM.inputBtn).addEventListener("click", ctrlAddItem);

    document.addEventListener("keypress", function (event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  };
  var DOM = UIctrl.getDomStrings();

  var ctrlAddItem = function () {
    var Input, newItem;
    //1. Get the filled data
    Input = UIctrl.getInput();

    //2. Add the item to the budget controller
    newItem = budgetController.addItem(
      Input.type,
      Input.description,
      Input.value
    );
    //3. Add the item to the UI
    UIController.AddListItem(newItem, Input.type);

    //4. Calculate the budget

    //5.Display the budget to the UI
  };
  return {
    init: function () {
      setUpEventListeners();
    },
  };
})(budgetController, UIController);

controller.init();
