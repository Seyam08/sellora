import { Client } from "@/models/Client";

export async function checkClientEmailExists(email: string): Promise<boolean> {
  try {
    const client = await Client.findOne({ email });

    return client ? true : false;
  } catch (error) {
    return false;
  }
}

export async function checkClientUsernameExists(
  username: string
): Promise<boolean> {
  try {
    const user = await Client.findOne({ username });
    return user ? true : false;
  } catch (error) {
    return false;
  }
}

export async function checkClientPhoneNumberExists(
  phoneNumber: string
): Promise<boolean> {
  try {
    const user = await Client.findOne({ phoneNumber });
    return user ? true : false;
  } catch (error) {
    return false;
  }
}
