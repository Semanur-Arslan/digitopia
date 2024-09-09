import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const data = {
    
        "idToken": {
            "jwtToken": "eyJraWQiOiJXcnBEXC9JcTA4b1o5WGFpUEszYWllRlArZHUrcENIelwvWHhZb0JlK1F6VWc9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJiYjU4M2IyMC04MDFmLTQwY2MtYmU4ZS1mNjgyYzZmZThjMzIiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS1jZW50cmFsLTEuYW1hem9uYXdzLmNvbVwvZXUtY2VudHJhbC0xXzVJc2ZHUTlMOSIsImNvZ25pdG86dXNlcm5hbWUiOiJiYjU4M2IyMC04MDFmLTQwY2MtYmU4ZS1mNjgyYzZmZThjMzIiLCJjdXN0b206b3JnYW5pemF0aW9uSWQiOiJhYmExN2M3Yi1hNGYxLTRhMDgtYWUxMi0yNWY4Njg3NmRmMTIiLCJjdXN0b206dXNlcklkIjoiZGNiYTNlZGYtYjFmMS00NmI0LWJmMjgtZmNhZTY0YjlhNGY0Iiwib3JpZ2luX2p0aSI6ImY0YWI1ZmQwLTY4NDktNDBkNC04YTM0LTYxMDU3YjJlNTU1YSIsImF1ZCI6IjZxcGpuNmRsZDc5YmE0NThwb2sxbWsyNWN0IiwiZXZlbnRfaWQiOiIyZDczMDIwYS0yNTVhLTQxM2EtYjY2MS05MTU0YTY1NTEyNjMiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTcyNTg3NzY4NSwibmFtZSI6IkNhbmRpZGF0ZSIsImN1c3RvbTpvcmdhbml6YXRpb25Sb2xlIjoiMSIsImV4cCI6MTcyNTk2NDA4NSwiY3VzdG9tOnJvbGUiOiI5MDAiLCJpYXQiOjE3MjU4Nzc2ODUsImZhbWlseV9uYW1lIjoiRGlnaXRvcGlhIiwianRpIjoiNGUzZTMxYTMtMTE0My00MDRlLThhNjktZTliNzdhNzJiNjg0IiwiZW1haWwiOiJzZW1hbnVycnJhcnNsYW5AZ21haWwuY29tIn0.nOdKZfeUscGTOMyx50M3udUmbPT6rorhisXzaYhu6rWGYv2F1michwgIFNBthtSn2JM1iPvsbMOnw-v6wLDI_EP_N1M5N1p9FFmaLptTehd5cs43Dc0obQqMveVK9irRzB0iB38hnUck-dloqlxrMKwsnW6ZCiI0bhEpO3lw_Rmr7U37_MDusPad4nd_qaZRpjTr5L1Hd2bI8eg6n1hFdv0nJkrmR3mSO5FKUjhJkUmbOpiG0t0Li7NPNwH2CtyHbL3Q8bX8UCpJAAsgPnxxL0qyait0vQmYZDRsgbgk7qFxBfjQ4fdWaaWRl9aZOnXTjH0E5bQIau6qlYtlD9YeSg",
            "payload": {
                "sub": "bb583b20-801f-40cc-be8e-f682c6fe8c32",
                "email_verified": false,
                "iss": "https://cognito-idp.eu-central-1.amazonaws.com/eu-central-1_5IsfGQ9L9",
                "cognito:username": "bb583b20-801f-40cc-be8e-f682c6fe8c32",
                "custom:organizationId": "aba17c7b-a4f1-4a08-ae12-25f86876df12",
                "custom:userId": "dcba3edf-b1f1-46b4-bf28-fcae64b9a4f4",
                "origin_jti": "f4ab5fd0-6849-40d4-8a34-61057b2e555a",
                "aud": "6qpjn6dld79ba458pok1mk25ct",
                "event_id": "2d73020a-255a-413a-b661-9154a6551263",
                "token_use": "id",
                "auth_time": 1725877685,
                "name": "Candidate",
                "custom:organizationRole": "1",
                "exp": 1725964085,
                "custom:role": "900",
                "iat": 1725877685,
                "family_name": "Digitopia",
                "jti": "4e3e31a3-1143-404e-8a69-e9b77a72b684",
                "email": "semanurrrarslan@gmail.com"
            }
        },
        "refreshToken": {
            "token": "eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.Ypb0IchXcCt-I-JpWHgPfbdH6rcEoWSBCyTBMjnzS3R07As4Bp4_BsDKMilSnMZkLr712e_aR9lqHe6nka88H33jnWS_FKRmNs5lejUKL8zFjP5ljS0C2YNYVAC7RNuyt9LJzpcqZeIMP65IBAjZjwggjGuDbgJBGmGuN48iv4sxl_sEj7QsLupgKL3cWt4Jm6JJ6jYgdKgkSZJbcIpb48ayJT2rH4ukQkAtat5xf5IvdJiC9u4FG4UqMdNlmxusmjZcKd_0e-xISizcP057axc-MuMqQRlv2EeaO_3sxqmJtFQdZdW9JzaZUo0Vlw2wSydihAvlrfhkhgiVRzNHVw.-OtkWyeo_orJ7TWL.KkePR-FKYSYpsEKl0BBGMuDIzwUESpMFJlo1nkEv5KEtEJR2k8xFoJRaMV_Zg0TjRDwGC25wt26O2US4WRYvwgcfGT6AhgTiyg7A_-YJ93xrQq-Q9T3ONuSlHOYTlO8hnAtpmOX5FBejTqqZ-hG-xqD-wWVv1zJfLuPobXtqHJLmeeSWcS4dd-q51T8TepC8N7i-snTH4cue6z_1xh32aveiO0w8THxEPre7NpDYRRu8o_EsLRPQbOF1Nu05S6Uar93Io5Pxg8teVQi1J3Kf0WM-hG7uZgaFq7Oslpkj4S9AUt5y62n15dX3Uy6rMIKaEqkoydT4MkoFw5Ppie6Sz-p7Tz6PmYpcfZlQNc6q3nuz36m-dNQ7DbG9wSfmKxcFWwUPBdIsrmAZcZZoo7YdTBjEfQwUzg7tJZ7pB8qFb5Ig8sIf37U-F0DgeAjj1X6bcJ6SM6a2Rgxau2RsOJCZKsClQi-kWpHFdtyigqSafSvsWdQVVEn8gThU0WPnN4KJXzmu9zAQoemVX91YQO_zENI8aSv2ZwJ23E5JPqBsxkniSL-tS3PBavYKcmwg5peKvLouzKSX183Mfm0SpnW5cTIXAFP2BUHEgCa3GkwJTjWYiUueCdU2sajwk_WyeoXuQxquZtxNoesa95RUMr8S6CyfwFy2KFotrfLtUNATM4UvfwRkt1aFHfUqAjhFVUYHxB_nI0dLdsfSLVCaHZuWm97CpZ2gv6fwbo4AbmwXR9XCMqiRlD5SJmzZ4kpli4753cOSIaDphnVR2ky18WC4TrJkWA968GfShfbaDbgASDppOKx3go_y9elnynFhE5OVqthTxvNkIlq3hRgs9CRxQZxbQaSblC4lh8Z200AEUfCn4qMLmdUmBJfFNexddk2LPy6bKpO2f6esaGqoxgwFt_abifQNGDaL4-kCohZhsWS-U1lKnjteyAi3_aQcE6DnYLh4Nymse6yXELHOUdzlv2CqA0ezMApMp-Kku8e4UABRyIkr-WyrQGvXz31ytfRj6Y1Bp0fznpdmF1WPfdm9jg-Rr64L68Le7iZl-3SRCKVwGJkGf5DEqbwew4oB8ncGv9OI-lvSdp_cZXh6HJhsHbMFOa4ru4XUDXE_10jvc_WEtHjtrF1a5NM0L5Vh-YEaMZ5pFzFKPkXT3TerYL8xDhoYl6W0uRS9k9BwHBp6w9DmV7miCCTnRYDD6G70_IiWZ4dALHnsMHjxJbSqquFUkvvzHg-jbsJR49miOEh8YIXMJ8nYBDCkhHkevlaUVkrvmDCZForx6nvdhOrNtk8IwBu8n9z4i_f__9R8p9Cb34H7LWLKSB8pAZmzFNOYsyOx5BcoHw.z7qphcm07fZzJgHsQ_PQVA"
        },
        "accessToken": {
            "jwtToken": "eyJraWQiOiJRQ3lQb3ZURDg2MWppOTB0WGR1QWlsaXVmbjBKb2xwdHNraEZ6OTV0cWo0PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJiYjU4M2IyMC04MDFmLTQwY2MtYmU4ZS1mNjgyYzZmZThjMzIiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtY2VudHJhbC0xLmFtYXpvbmF3cy5jb21cL2V1LWNlbnRyYWwtMV81SXNmR1E5TDkiLCJjbGllbnRfaWQiOiI2cXBqbjZkbGQ3OWJhNDU4cG9rMW1rMjVjdCIsIm9yaWdpbl9qdGkiOiJmNGFiNWZkMC02ODQ5LTQwZDQtOGEzNC02MTA1N2IyZTU1NWEiLCJldmVudF9pZCI6IjJkNzMwMjBhLTI1NWEtNDEzYS1iNjYxLTkxNTRhNjU1MTI2MyIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE3MjU4Nzc2ODUsImV4cCI6MTcyNTk2NDA4NSwiaWF0IjoxNzI1ODc3Njg1LCJqdGkiOiI4MTQyZmJhNi1mODIyLTRlZmMtOTU1OC04Mjc5MmE5YWMyY2YiLCJ1c2VybmFtZSI6ImJiNTgzYjIwLTgwMWYtNDBjYy1iZThlLWY2ODJjNmZlOGMzMiJ9.hRezQb89hvFuKNOUuZTzDvjbdBIAPOCHbq7nNSMTMyHFETqGkR7asAheL-sYodd7MiyZzuLvKpFlZiZrPRsr3UtZAzw2e-UjA6lJpdqYP0Dl7rMaJ76fR4NzK_dR6G1sQU5szpj8Vo666ywnLDE4ISyFBrW10j7tQkkbfzhzOemRFah0EXokGDAvhDkGm5tvuE_VGL9kw3ZGjCzMFZOgrFqz-PKUkXHNY4JJTjL7heAt0CwQNGbHKC4xsnlZQ6zGpGg4cfXGzW4byTZ6O49JSHH3hQqf_R0-oE0zvdE5SVwPHjI99GRY2A8KJsfJ1XJdIFD6VcGoadIkoRFX7kDw2g",
            "payload": {
                "sub": "bb583b20-801f-40cc-be8e-f682c6fe8c32",
                "iss": "https://cognito-idp.eu-central-1.amazonaws.com/eu-central-1_5IsfGQ9L9",
                "client_id": "6qpjn6dld79ba458pok1mk25ct",
                "origin_jti": "f4ab5fd0-6849-40d4-8a34-61057b2e555a",
                "event_id": "2d73020a-255a-413a-b661-9154a6551263",
                "token_use": "access",
                "scope": "aws.cognito.signin.user.admin",
                "auth_time": 1725877685,
                "exp": 1725964085,
                "iat": 1725877685,
                "jti": "8142fba6-f822-4efc-9558-82792a9ac2cf",
                "username": "bb583b20-801f-40cc-be8e-f682c6fe8c32"
            }
        },
        "clockDrift": 0
    
}

export const login = createAsyncThunk('auth/login', async (credentials) => {
  // try {
  //   const response = await axios.post('https://dev.digitopia.co/api/a2/signIn', credentials, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });
  //   return response.data;
  // } catch (error) {
  //   throw new Error(error.response?.data?.message || 'Giriş başarısız');
  // }
  return data;
});
