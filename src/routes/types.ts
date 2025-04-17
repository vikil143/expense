import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Dashboard: undefined;
  Scanner: undefined;
  Amount: undefined;
}

export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>;
