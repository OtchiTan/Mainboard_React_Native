import {
  View,
  StyleSheet,
  TextInput,
  Button,
  BackHandler,
  Text,
} from 'react-native';
import {useState, useRef, useContext, useEffect} from 'react';
import AppContext from '../../AppContext';
import {AxiosClient} from '../../Utils/AxiosClient';
import {RoutesList} from '../../Utils/Declarations';
import {NavigationProp} from '@react-navigation/native';

type LoginForm = {
  email: string;
  password: string;
};

type ResponseAPI = {
  authToken: string;
};

export default ({
  navigation,
}: {
  navigation: NavigationProp<RoutesList>;
}): JSX.Element => {
  const [loginForm, setLoginForm] = useState<LoginForm>({
    email: '',
    password: '',
  });

  const passwordInput = useRef<TextInput>(null);
  const {setAuthToken} = useContext(AppContext);

  useEffect(() => {
    const backHandler = () => true;
    BackHandler.addEventListener('hardwareBackPress', backHandler);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backHandler);
    };
  }, []);

  const handleSubmit = async () => {
    new AxiosClient()
      .post<ResponseAPI>('auth/login', loginForm)
      .then(({data}) => {
        setAuthToken(data.authToken);
        navigation.navigate('Dashboard');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const openRegister = () => {
    navigation.navigate('Register');
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
      <Text style={styles.text} onPress={openRegister}>
        Register
      </Text>
      <Button title="Login" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  text: {padding: 5, color: 'blue', textDecorationLine: 'underline'},
});
