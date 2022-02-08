import React from "react";
import styled from "styled-components";

function LoginForm() {
	return (
		<Form>
			<InputWrapper>
				<Label htmlFor="email">Email</Label>
				<Input type="email" id="email" name="email" />
			</InputWrapper>
			<InputWrapper>
				<Label htmlFor="password">Password</Label>
				<Input type="password" id="password" name="password" />
			</InputWrapper>
			<SubmitButton type="submit">Login</SubmitButton>
		</Form>
	);
}

const Form = styled.form``;

const InputWrapper = styled.div``;

const Label = styled.label``;

const Input = styled.input``;

const SubmitButton = styled.button``;

export default LoginForm;
