import type { NextPage } from 'next';
import Head from 'next/head';
import { SyntheticEvent, useCallback } from 'react';

const BOT_API_KEY = process.env.NEXT_PUBLIC_BOT_API_KEY;
const MY_CHANNEL_NAME = '@toastmaster_weddings_germany';

const Home: NextPage = () => {
  const submit = useCallback(async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, tel } = e.currentTarget.elements as typeof e.currentTarget.elements & {
      name: { value: string };
      tel: { value: string };
    };
    const MY_MESSAGE_TEXT = `Имя: ${name.value} Телефон: ${tel.value}`;

    const res = await fetch(
      `https://api.telegram.org/bot${BOT_API_KEY}/sendMessage?chat_id=${MY_CHANNEL_NAME}&text=${MY_MESSAGE_TEXT}`,
    );
    console.log(await res.json());
  }, []);
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/public/favicon.ico" />
      </Head>
      <form onSubmit={submit}>
        <input type="text" placeholder="Ваше имя" required name="name" />
        <input type="tel" placeholder="Введите номер телефона" required name="tel" />
        <button type="submit">Отправить</button>
      </form>
    </div>
  );
};

export default Home;
