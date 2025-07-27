import { UpiParams } from "@myapp/utilities/common-types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Dashboard: undefined;
  Scanner: undefined;
  Amount: UpiParams;
}

export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>;
