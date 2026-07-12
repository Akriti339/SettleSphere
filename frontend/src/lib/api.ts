import { INewExpense, INewGroup, INewUser, ISettlement } from "@/types";

const API_URL = import.meta.env.VITE_API_URL;
if (!API_URL) {
  throw new Error("VITE_API_URL is not defined");
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });
  if (response.status === 204) return undefined as T;
  const text = await response.text();

  let body = null;

  try {
    body = text ? JSON.parse(text) : null;
  } catch {
    body = null;
  }

  if (!response.ok) {
    throw new Error(body?.message || "Request failed");
  }

  return body as T;
}

const mapUser = (user: any) => ({ ...user, $id: user.id || user._id, UserName: user.username, UserMember: user.group || [], List: user.list || [] });
const mapGroup = (group: any, expenses: any[] = []) => ({ ...group, $id: group._id || group.id, groupName: group.groupName, Creator: group.creator ? mapUser(group.creator) : undefined, Members: (group.members || []).map(mapUser), activity: expenses.map(mapExpense) });
const mapExpense = (expense: any) => ({ ...expense, $id: expense._id || expense.id, Desc: expense.description, Amout: String(expense.amount), PaidBy: expense.paidBy, Group: expense.group, Time: expense.createdAt, splitMember: expense.splitMembers || [] });

export async function createUserAccount(user: INewUser) { const { user: created } = await request<{ user: any }>("/api/auth/register", { method: "POST", body: JSON.stringify(user) }); return mapUser(created); }
export async function signInAccount(user: { email: string; password: string }) { return request("/api/auth/login", { method: "POST", body: JSON.stringify(user) }); }
export async function signOutAccount() { return request<void>("/api/auth/logout", { method: "POST" }); }
export async function getCurrentUser() {
  try {
    const { user } = await request<{ user: any }>("/api/auth/me");
    const { groups } = await request<{ groups: any[] }>("/api/groups");
    return { ...mapUser(user), UserMember: groups.map((group) => mapGroup(group)), group: groups.map((group) => mapGroup(group)) };
  } catch { return null; }
}
export async function createGroup(group: INewGroup) { const { group: created } = await request<{ group: any }>("/api/groups", { method: "POST", body: JSON.stringify({ groupName: group.groupName, members: group.members }) }); return mapGroup(created); }
export async function getGroups() { const { groups } = await request<{ groups: any[] }>("/api/groups"); return { documents: groups.map((group) => mapGroup(group)), total: groups.length }; }
export async function getGroupById(groupId: string) { const { group, expenses } = await request<{ group: any; expenses: any[] }>(`/api/groups/${groupId}`); return mapGroup(group, expenses); }
export async function createExpense(expense: INewExpense) { const { expense: created } = await request<{ expense: any }>("/api/expenses", { method: "POST", body: JSON.stringify({ description: expense.desc, amount: Number(expense.amount), groupId: expense.group, paidBy: expense.paidBy, splitMembers: expense.splitMember }) }); return mapExpense(created); }
export async function deleteActivity(activityId?: string) { return request<void>(`/api/expenses/${activityId}`, { method: "DELETE" }); }
export async function deleteGroup(groupId?: string) { return request<void>(`/api/groups/${groupId}`, { method: "DELETE" }); }

// These endpoints are introduced with the user and settlement modules in the next API increment.
export async function getFriends(_userId?: string): Promise<any> { const { friends } = await request<{ friends: any[] }>("/api/users/friends"); return { documents: [{ $id: "friends", friendsId: friends.map(mapUser) }] }; }
export async function getUsers(): Promise<any> { const { users } = await request<{ users: any[] }>("/api/users"); return { documents: users.map(mapUser) }; }
export async function getUserById(_userId?: string): Promise<any> { return null; }
export async function getByUsername(username?: string) { const { users } = await request<{ users: any[] }>(`/api/users?username=${encodeURIComponent(username || "")}`); return users[0] ? mapUser(users[0]) : null; }
export async function getActivity(): Promise<any> { return { documents: [] as any[] }; }
export async function getGroupsActivityById(_groups?: any): Promise<any[]> { return []; }
export async function getUserGroupsById(_groups?: any): Promise<any[]> { return []; }
export async function getSettlement(userId?: string, receiverId?: string): Promise<any> { const params = new URLSearchParams(); if (userId) params.set("payerId", userId); if (receiverId) params.set("receiverId", receiverId); const { settlements } = await request<{ settlements: any[] }>(`/api/settlements?${params}`); return { documents: settlements.map((item) => ({ ...item, $id: item._id, Amount: String(item.amount), Time: item.createdAt, payerId: item.payer, receiverId: item.receiver })) }; }
export async function makeSettlement(settlement: ISettlement) { const { settlement: created } = await request<{ settlement: any }>("/api/settlements", { method: "POST", body: JSON.stringify({ receiverId: settlement.receiverId, amount: settlement.amount }) }); return created; }
export async function addMember(groupId: string, userId: string) { const { group } = await request<{ group: any }>(`/api/groups/${groupId}/members`, { method: "PATCH", body: JSON.stringify({ userId }) }); return mapGroup(group); }
export async function addFriend(userId: string) { return request<void>(`/api/users/${userId}/friends`, { method: "POST" }); }
