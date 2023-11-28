const allData = [
    {
      id: 1,
      username: "john",
      name: "John Doe",
      address: "Address",
      phone: "01881044662",
      details: [
          {
            id: 1,
            date: "22 Aug, 23",
            boughtProducts: "Flexiload",
            totalPrice: "100",
            givenAmount: "50",
            dueAmount: "50"
          },
          {
            id: 2,
            date: "26 Aug, 23",
            boughtProducts: "Recharge",
            totalPrice: "200",
            givenAmount: "140",
            dueAmount: "60"
          }
        ],
      paymentStatus: "unpaid"
    },
    {
      id: 2,
      username: "david",
      name: "Adams Smith",
      address: "Address",
      phone: "01776181712",
      details: [
          {
            id: 1,
            date: "22 Aug, 23",
            boughtProducts: "Recharge",
            totalPrice: "100",
            givenAmount: "50",
            dueAmount: "50"
          },
          {
            id: 2,
            date: "26 Aug, 23",
            boughtProducts: "Recharge",
            totalPrice: "200",
            givenAmount: "150",
            dueAmount: "50"
          }
        ],
      paymentStatus: "paid"
    }
  ]
  
export default allData;