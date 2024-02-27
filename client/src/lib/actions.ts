export async function register(email: string, password: string) {
  try {
    const response :Response = await fetch("http://localhost:8000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if(response.status != 200){
      throw new Error(data.message);
    }
    return data;
  } catch (error:any) {
    throw new Error(error.message);
  }
}

export async function login(email: string, password: string) {
  try {
    const response :Response = await fetch("http://localhost:8000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data =  response.json();
    if(response.status != 200){
      throw new Error(response.statusText);
    }
    return data;
  } catch (error:any) {
    throw new Error(error.message);
  }
}