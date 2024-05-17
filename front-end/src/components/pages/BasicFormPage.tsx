function BasicFormPage() {
  const BACKEND_URL: string | undefined = process.env.REACT_APP_BACKEND_URL;

  interface basicDetailsInterace {
    [Key: string]: FormDataEntryValue;
  }
  enum basicDetails {
    fullName,
    email,
    address,
    city,
    zipcode,
  }

  type failedValidationObjType = {
    [Key in basicDetails]?: string;
  };

  const validateForm = (
    basicDetailsObj: basicDetailsInterace
  ): failedValidationObjType => {
    const failedValidationObj: failedValidationObjType = {};

    if (
      !basicDetailsObj.fullName ||
      basicDetailsObj.fullName.toString().length === 0
    )
      failedValidationObj[basicDetails.fullName] = "fullName";
    if (!basicDetailsObj.email || basicDetailsObj.email.toString().length === 0)
      failedValidationObj[basicDetails.email] = "email";
    if (
      !basicDetailsObj.address ||
      basicDetailsObj.address.toString().length === 0
    )
      failedValidationObj[basicDetails.address] = "address";
    if (!basicDetailsObj.city || basicDetailsObj.city.toString().length === 0)
      failedValidationObj[basicDetails.city] = "city";

    if (
      !basicDetailsObj.zipcode ||
      (basicDetailsObj.zipcode &&
        (isNaN(parseInt(basicDetailsObj.zipcode.toString())) ||
          basicDetailsObj.zipcode.toString().length != 6))
    )
      failedValidationObj[basicDetails.zipcode] = "zipcode";

    return failedValidationObj;
  };
  const submitBasicForm = async () => {
    const basicDetailsForm: HTMLFormElement = document.getElementById(
      "basicDetailsForm"
    ) as HTMLFormElement;
    const basicDetailsFormData: FormData = new FormData(basicDetailsForm);
    const basicDetailsObj: basicDetailsInterace = {};
    for (var [key, val] of basicDetailsFormData.entries()) {
      if (val && typeof val === "string") {
        val = val.trim();
      }
      basicDetailsObj[key] = val;
    }

    // console.log(basicDetailsObj);

    const validationResult: failedValidationObjType =
      validateForm(basicDetailsObj);

    console.log("rs", validationResult);
    if (!validationResult || Object.values(validationResult).length !== 0) {
      alert("validation failed");
      return;
    }

    const basicDetailsFetchResult = await fetch(`${BACKEND_URL}/`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(basicDetailsObj),
    });

    const basicDetailsFetchJson = await basicDetailsFetchResult.json();

    if (
      basicDetailsFetchJson &&
      basicDetailsFetchJson.success === 1 &&
      basicDetailsFetchJson.result
    ) {
      alert("inserted");
    }
  };

  const onSubmitBasicForm: React.ChangeEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };
  return (
    <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <form id="basicDetailsForm" onSubmit={onSubmitBasicForm}>
          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                  <div className="md:col-span-5">
                    <label htmlFor="fullName">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      id="full_name"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      defaultValue=""
                    />
                  </div>

                  <div className="md:col-span-5">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      defaultValue=""
                      placeholder="email@domain.com"
                    />
                  </div>

                  <div className="md:col-span-3">
                    <label htmlFor="address">Address / Street</label>
                    <input
                      type="text"
                      name="address"
                      id="address"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      defaultValue=""
                      placeholder=""
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      name="city"
                      id="city"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      defaultValue=""
                      placeholder=""
                    />
                  </div>

                  <div className="md:col-span-1">
                    <label htmlFor="zipcode">Zipcode</label>
                    <input
                      type="text"
                      name="zipcode"
                      id="zipcode"
                      className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      placeholder=""
                      defaultValue=""
                    />
                  </div>

                  <div className="md:col-span-5 text-right">
                    <div className="flex items-start">
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={submitBasicForm}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BasicFormPage;
