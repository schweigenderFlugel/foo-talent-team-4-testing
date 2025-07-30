"use server"

const onLoginSubmit = async (formData: FormData) => {
    const email = formData.get("email");
    const password = formData.get("password")

    console.log({ email, password });

}

export default onLoginSubmit