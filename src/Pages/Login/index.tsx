import {View, StyleSheet, TextInput, Button} from 'react-native';
import {useState, useRef} from 'react';

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

  const handleSubmit = () => {
    console.log(loginForm);
  };

  const setPasswordFocus = () => {
    console.log(passwordInput.current?.focus());
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
        onSubmitEditing={setPasswordFocus}
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
