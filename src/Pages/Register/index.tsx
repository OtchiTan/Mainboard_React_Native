import {View, StyleSheet, TextInput, Button, BackHandler} from 'react-native';
import {useState, useRef, useContext, useEffect} from 'react';
import AppContext from '../../AppContext';
import {AxiosClient} from '../../Utils/AxiosClient';
import {NavigationProp} from '@react-navigation/native';
import {RoutesList} from '../../Utils/Declarations';

type LoginForm = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
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
    username: '',
    password: '',
    confirmPassword: '',
  });

  const passwordInput = useRef<TextInput>(null);
  const {setAuthToken} = useContext(AppContext);

  useEffect(() => {
    const backHandler = () => false;
    BackHandler.addEventListener('hardwareBackPress', backHandler);

    const focusListener = navigation.addListener('focus', () => {
      setLoginForm({
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
      });
    });

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backHandler);
      navigation.removeListener('focus', focusListener);
    };
  }, []);

  const handleSubmit = async () => {
    new AxiosClient()
      .post<ResponseAPI>('auth/register', loginForm)
      .then(({data}) => {
        setAuthToken(data.authToken);
        navigation.navigate('Dashboard');
      })
      .catch(error => {
        console.log(error);
      });
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
        value={loginForm.email}
      />
      <TextInput
        placeholder="Username"
        onChangeText={username =>
          setLoginForm(loginForm => {
            return {...loginForm, username};
          })
        }
        onSubmitEditing={passwordInput.current?.focus}
        value={loginForm.username}
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
        value={loginForm.password}
      />
      <TextInput
        placeholder="Confirm Password"
        ref={passwordInput}
        onChangeText={confirmPassword =>
          setLoginForm(loginForm => {
            return {...loginForm, confirmPassword};
          })
        }
        secureTextEntry={true}
        onSubmitEditing={handleSubmit}
        value={loginForm.confirmPassword}
      />
      <Button title="Register" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  text: {padding: 5, color: 'blue', textDecorationLine: 'underline'},
});
