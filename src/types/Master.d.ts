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
  interface Booking {
    id: number;
    user: User[];
    showId: number;
    seatsBooked: number;
  }
  interface User {
    id: number;
    name: string;
  }
}
