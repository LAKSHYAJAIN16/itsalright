export default class IATest {
  constructor(
    fn,
    completionMessage = "SUCCESS : TEST PASSED",
    errorMessage = "ERROR : Test Failed"
  ) {
    this.fn = fn;
    this.completionMessage = completionMessage;
    this.errorMessage = errorMessage;
  }

  test() {
    try {
      //Call
      this.fn();

      //Submit completion message
      console.log(this.completionMessage);
    } catch (err) {
      //Submit Error Message
      console.error(`${this.errorMessage} : ${err}`);
    }
  }
}
