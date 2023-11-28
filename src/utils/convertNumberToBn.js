const digits = [
   "০","১","২","৩","৪","৫","৬","৭","৮","৯"
  ]

export default function converter(number){
  let bn = []
  for (var digit of number.toString()) {
    bn.push(digits[digit])
  }
  bn = bn.join(",").replaceAll(',',"")
  return bn
}
