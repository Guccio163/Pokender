// import type Onyx from 'react-native-onyx';
// import type {CollectionKeyBase} from 'react-native-onyx/dist/types';
import type {OnyxKey, OnyxValues} from './ONYXKEYS';

declare module 'react-native-onyx' {
  interface CustomTypeOptions {
    keys: OnyxKey;
    values: OnyxValues;
  }
}
