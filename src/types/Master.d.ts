declare namespace Master {
  interface LoginRequest {
    userId: string;
    password: string;
  }

  interface RegisterRequest {
    userId: string;
    password: string;
    name: string;
  }
  interface Movie {
    id: number;
    movieName: string;
  }
}
