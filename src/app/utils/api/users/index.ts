import { buildUrl } from "..";
import { USER_ENDPOINTS } from "../../constants/users";
import { formatBirthDate, formatGender } from "../../formatters";
import { User } from "./types";

export type UserApiResponse = {
  data: MappedUserReturnType[];
  meta: {
    total: number;
  };
};

type UserKeys =
  | "email"
  | "firstName"
  | "image"
  | "username"
  | "phone"
  | "age"
  | "birthDate"
  | "gender";

export type MappedUserReturnType = Pick<User, UserKeys> & { uuid: string };

const mapUsers = (data: User): MappedUserReturnType => {
  return {
    uuid: data.id.toString(),
    email: data.email,
    firstName: data.firstName,
    image: data.image,
    username: data.username,
    phone: data.phone,
    age: data.age,
    birthDate: formatBirthDate(data.birthDate),
    gender: formatGender(data.gender),
  };
};

export interface UserQueryParams {
  search?: string | null;
  sortBy?: string;
  sort?: string;
  skip: number;
  limit: number;
}

export async function fetchUsers(
  params: UserQueryParams
): Promise<UserApiResponse> {
  const isSearch = !!params?.search;
  const endpoint = isSearch ? USER_ENDPOINTS.searchUsers : USER_ENDPOINTS.users;
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";

  const url = buildUrl(baseUrl, endpoint, {
    skip: params.skip,
    limit: params.limit,
    q: params?.search,
    sortBy: params.sortBy,
    sort: params.sort,
  });

  try {
    const response = await (await fetch(url)).json();
    return {
      data: response.users.map(mapUsers),
      meta: {
        total: response.total,
      },
    };
  } catch (error) {
    console.warn(error);
    return {
      data: [],
      meta: {
        total: 0,
      },
    };
  }
}
