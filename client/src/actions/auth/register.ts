"use server"

const onRegisterSubmit = async (formData: FormData) => {
    const email = formData.get("email");
    const password = formData.get("password")
    
    console.log({ email, password });
}

export default onRegisterSubmit