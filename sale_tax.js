var salesTaxRates = {
  AB: 0.05,
  BC: 0.12,
  SK: 0.10
};

var companySalesData = [
  {
    name: "Telus",
    province: "BC",
    sales: [ 100, 200, 400 ]
  },
  {
    name: "Bombardier",
    province: "AB",
    sales: [ 80, 20, 10, 100, 90, 500 ]
  },
  {
    name: "Telus",
    province: "SK",
    sales: [ 500, 100 ]
  }
];


//input: obj, obj
//output: loop and create structure: data.name {sales: x, tax: y}

function calculateSalesTax(companySalesData, salesTaxRates) {
  //create final obj
  var companyData = {};

  //loop and create nested obj
  companySalesData.forEach(function(obj){
    var newName = obj.name;
    var province = obj.province;
    //if not exists, create and set sales to zero
    //else access existing one and add update sales
    if (!companyData[newName]){
      companyData[newName] = {};
      var newTotalSales = 0;
      var newTotalTaxes = 0;
      //calculate totalsales
      obj.sales.forEach(function(num){
        newTotalSales += num;
      });
      //calculate total tax
      newTotalTaxes = newTotalSales * salesTaxRates[province];
    } else {
      //access old sales
      var existingTotalSales = companyData[newName].totalSales;
      //more sales
      var moreSales = 0;
      obj.sales.forEach(function(num){
        moreSales += num;
      });
      newTotalSales = existingTotalSales + moreSales;

      //moreTaxes = moreSales * salesTaxRates[province];
      var moreTaxes = moreSales * salesTaxRates[province];
      // access and update old tax
      var existingTotalTaxes = companyData[newName].totalTaxes;
      newTotalTaxes = existingTotalTaxes + moreTaxes;

    }
    //update properties
    companyData[newName].totalSales = newTotalSales;
    companyData[newName].totalTaxes = newTotalTaxes;

  });
  return companyData;
}

var results = calculateSalesTax(companySalesData, salesTaxRates);

console.log(results);



// Expected Results:
// {
//   Telus: {
//     totalSales: 1300
//     totalTaxes: 144
//   },
//   Bombardier: {
//     totalSales: 800,
//     totalTaxes: 40
//   }
// }
