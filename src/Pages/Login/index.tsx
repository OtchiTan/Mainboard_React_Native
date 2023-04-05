import {
  View,
  StyleSheet,
  TextInput,
  Button,
  NativeModules,
  BackHandler,
} from 'react-native';
import {useState, useRef, useContext, useEffect} from 'react';
import {HttpErrorCause} from '../../Utils/Declarations';
import AppContext from '../../AppContext';
import AxiosClient from '../../Utils/AxiosClient';
import {getAuthHeader} from '../../Utils/AuthStorage';

type LoginForm = {
  email: string;
  password: string;
};

export default ({navigation}: any): JSX.Element => {
  const [loginForm, setLoginForm] = useState<LoginForm>({
    email: '',
    password: '',
  });

  const passwordInput = useRef<TextInput>(null);
  const {setAuthToken} = useContext(AppContext);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => true);
  }, []);

  const handleSubmit = async () => {
    AxiosClient.post('auth/login', loginForm, {headers: await getAuthHeader()})
      .then(res => {
        setAuthToken(res.data.authToken);
        navigation.navigate('Dashboard');
      })
      .catch(err => console.log(err));
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="E-Mail"
        onChangeText={email =>
          setLoginForm(loginForm => {
            return {...loginForm, email};
          })
        }
        onSubmitEditing={passwordInput.current?.focus}
      />
      <TextInput
        placeholder="Password"
        ref={passwordInput}
        onChangeText={password =>
          setLoginForm(loginForm => {
            return {...loginForm, password};
          })
        }
        secureTextEntry={true}
        onSubmitEditing={handleSubmit}
      />
      <Button title="Login" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
