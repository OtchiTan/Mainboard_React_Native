import {View, StyleSheet, TextInput, Button, BackHandler} from 'react-native';
import {useState, useRef, useContext, useEffect} from 'react';
import AppContext from '../../AppContext';
import HttpClient from '../../Utils/HttpClient';

type LoginForm = {
  email: string;
  password: string;
  confirmPassword: string;
};

type ResponseAPI = {
  authToken: string;
};

export default ({navigation}: any): JSX.Element => {
  const [loginForm, setLoginForm] = useState<LoginForm>({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const passwordInput = useRef<TextInput>(null);
  const {setAuthToken} = useContext(AppContext);

  useEffect(() => {
    const backHandler = () => false;
    BackHandler.addEventListener('hardwareBackPress', backHandler);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backHandler);
    };
  }, []);

  const handleSubmit = async () => {
    const httpClient = new HttpClient<ResponseAPI>();
    httpClient
      .post('auth/register', loginForm)
      .then(({authToken}) => {
        setAuthToken(authToken);
        navigation.navigate('Dashboard');
      })
      .catch(error => {
        console.log(JSON.stringify(error, null, 2));
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
      />
      <Button title="Register" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  text: {padding: 5, color: 'blue', textDecorationLine: 'underline'},
});
