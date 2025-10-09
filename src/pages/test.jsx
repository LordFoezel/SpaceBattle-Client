import { BaseInput } from '../components/inputs/baseInput.jsx'
import { BaseInputNumber } from '../components/inputs/baseInputNumber.jsx'
import { BaseInputEmail } from '../components/inputs/baseInputEmail.jsx'
import { BaseInputPassword } from '../components/inputs/baseInputPassword.jsx'
import { BaseTextarea } from '../components/inputs/baseTextarea.jsx'

export default function TestPage() {
  const text = 'Hello Peoples'


  return (
    <section className="testing-page">
      <h1>Test Page</h1>
      <p>This page is for testing new components.</p>
      <BaseInput />
      <BaseInputNumber />
      <BaseInputEmail />
      <BaseInputPassword />
      <BaseTextarea />
    </section>
  );
}
