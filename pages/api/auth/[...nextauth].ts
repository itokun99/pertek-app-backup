// import NextAuth from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';

// export default NextAuth({
//   pages: {
//     signIn: '/login',
//   },
//   providers: [
//     CredentialsProvider({
//       name: 'Propertek Auth',
//       credentials: {
//         username: { label: 'Username', type: 'text', placeholder: 'Username' },
//         password: { label: 'Password', type: 'password' },
//       },
//       authorize: async (credentials, req) => {
//         console.log(credentials);
//         const result = await fetch('https://x8ki-letl-twmt.n7.xano.io/api:xG61OBxf/auth/login', {
//           method: 'POST',
//           body: JSON.stringify({
//             username: credentials?.username,
//             password: credentials?.password,
//           }),
//         });
//         console.log(result);
//         if (result.ok) {
//           const user = await result.json();
//           return user;
//         }
//         return null;
//       },
//     }),
//   ],
// });
