import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const data = {
        "idToken": {
            "jwtToken": "eyJraWQiOiJXcnBEXC9JcTA4b1o5WGFpUEszYWllRlArZHUrcENIelwvWHhZb0JlK1F6VWc9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJiYjU4M2IyMC04MDFmLTQwY2MtYmU4ZS1mNjgyYzZmZThjMzIiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS1jZW50cmFsLTEuYW1hem9uYXdzLmNvbVwvZXUtY2VudHJhbC0xXzVJc2ZHUTlMOSIsImNvZ25pdG86dXNlcm5hbWUiOiJiYjU4M2IyMC04MDFmLTQwY2MtYmU4ZS1mNjgyYzZmZThjMzIiLCJjdXN0b206b3JnYW5pemF0aW9uSWQiOiJhYmExN2M3Yi1hNGYxLTRhMDgtYWUxMi0yNWY4Njg3NmRmMTIiLCJjdXN0b206dXNlcklkIjoiZGNiYTNlZGYtYjFmMS00NmI0LWJmMjgtZmNhZTY0YjlhNGY0Iiwib3JpZ2luX2p0aSI6IjViZWRmZjAyLTEzYTktNDA0OS05YjU2LWU3YjA3NzA0NzU0OCIsImF1ZCI6IjZxcGpuNmRsZDc5YmE0NThwb2sxbWsyNWN0IiwiZXZlbnRfaWQiOiIyNmIwNmVjNS1jZDAzLTRkM2EtYWRiMC1kYmNmMTE0NzdhNjgiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTcyNTk3MDg4NiwibmFtZSI6IkNhbmRpZGF0ZSIsImN1c3RvbTpvcmdhbml6YXRpb25Sb2xlIjoiMSIsImV4cCI6MTcyNjA1NzI4NiwiY3VzdG9tOnJvbGUiOiI5MDAiLCJpYXQiOjE3MjU5NzA4ODYsImZhbWlseV9uYW1lIjoiRGlnaXRvcGlhIiwianRpIjoiZTQ2NDJmZTgtNzVkMS00OGIwLWFlMjUtYjYyNTc2ZDBjMzAwIiwiZW1haWwiOiJzZW1hbnVycnJhcnNsYW5AZ21haWwuY29tIn0.BBUid7zmJAlYlEPAzTL6lBa1LkCu0rrl_J38snnTc7SZWy4z_NgPtNEAiaRysCjBrfeyQiu9f7zPS6p4E_DEe0UQLEV3tMg4pmLU3KoBVC_eEB-rA_GtPR9EBQsoCyQrhKhsPElNkMvAcgEPYTsyoJbqjjVGO9JjhWeMPXQS62HuHr6A0mUPIgtRQjZ9jiRvZTIpSat5bhBeBWG51u1G62Lm0OQ5yhrinxw_fR0TYAqqUg0F86WU8_Lnqt7i5UgnMoTLyfcbW5nS-r2Vyx73MfI2eWxcdRlGa0OrBxWJC6Nln4aiyWh-r5SGHdbFE336WETIjDe4XAXvvxBpynpfYw",
            "payload": {
                "sub": "bb583b20-801f-40cc-be8e-f682c6fe8c32",
                "email_verified": false,
                "iss": "https://cognito-idp.eu-central-1.amazonaws.com/eu-central-1_5IsfGQ9L9",
                "cognito:username": "bb583b20-801f-40cc-be8e-f682c6fe8c32",
                "custom:organizationId": "aba17c7b-a4f1-4a08-ae12-25f86876df12",
                "custom:userId": "dcba3edf-b1f1-46b4-bf28-fcae64b9a4f4",
                "origin_jti": "5bedff02-13a9-4049-9b56-e7b077047548",
                "aud": "6qpjn6dld79ba458pok1mk25ct",
                "event_id": "26b06ec5-cd03-4d3a-adb0-dbcf11477a68",
                "token_use": "id",
                "auth_time": 1725970886,
                "name": "Candidate",
                "custom:organizationRole": "1",
                "exp": 1726057286,
                "custom:role": "900",
                "iat": 1725970886,
                "family_name": "Digitopia",
                "jti": "e4642fe8-75d1-48b0-ae25-b62576d0c300",
                "email": "semanurrrarslan@gmail.com"
            }
        },
        "refreshToken": {
            "token": "eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.kZTEwFiaAQjbMFLTY4nMQO77CbcJJRODRtnKqSUzLKlajxsjou7u79O8QwRmNl2rRK3E48T6HBaZJ0a-dIWnhly-47UBm9vXfrr5Ug3Ln-s8lj7c4nVACDBs5Bb8lZVO5788pwIssDxoGHRvnwbuaWAmmmblp2gpb89KOFngrbv0F5AGiri_3K0tHBjW1Dy2_zI_85trxQULRS2Lrc5QJWLkSc8K-ZAGrFkKv2TMqJjcqv2wHR_NPtGl_KK-ylRRIuepE25iSfgCMErEwVMtQpJgJCKlpojR2cHJp7tA025FMGVqzTDJe-kBjdL3QWSOfYJL8trSBHFxdaDTsJJ4Fw.Pf_PFk-1ev5SEGpC.9bPogaumPUyTNAYhGdcInmiD98OluPt44-_IR4plGvcs04mosZSLjdN96luLsCazvJMf6w68dL-5it1TQFSSWV1Wd8L8XX7TanPTPs6cMvKIy4Wv7QG8ZC5nEir1M_exPDb296FsTAdsC9xP3we0NbEX8JocWAH6kPlSH4OO_KaTp34H7yH2Jyxpr2Qtd3Kg0TBvMEZAr3QL0PdXYFZLauapRq99AsCHfztHRkcQLIVI82XmJxRgOTJ1xjZGOv9IafcfQs0mgdBne02c5fkUP_UuECSTa8F_ykgTYYiXL9Iblp0X9ERRBBJfRiN9sg4C3a98v5bLeq8j4hUYM4uLNfy21OyhNZnMqNdsCFCTejCg_9HDlaOIQ_Cw1kKaqofn9Hn9iebjZusKOu7atbysX5WccI7Y40eGjclUrunYSsn5QjL8c9p4Vza9fE6rOZlr3mjPtI_nVYVkEPB_dHR7uI_YF0ZSfFXqjTeFr4dRfczqFld70a86f-y_4XmztQhxYcPL3KqOIk4GZx7yPMex9phzPqCzY_hPgOLzJrE29AQUTN_sfGzoRqDZ7k1Prgpv8ti8fZy1098sjnYv6GhYEcu4PyEsdpTQ_lYU_ky-ujmmUTP93sE7jQR_7j22dP1gx1hMbghI7GlCFyZ0GprjP-6FGBi-HFZ6_pRmcmCvM7M7ssHDR6MTrmGO_zsTFpy0ZF6u_wmVDHA26jF-pGx1F8N7JlJzO6vVhEDAidyAooyLmo2uVKRt2_VHayITn82yZSgiJ4d99muIrtXlkNneEOdWON4Zll1-zZs_PbvZliX4DFrdC3kzca3CGigWP6lwBCZypvraqAee00kFOzCzcjXsiPCGO0pmZ2G2iyY88AHSY-YXgNWaVFnYUNEYNrxCR0DsJbrsQ1U7b1hbPYp-bIREIhh__IJPGP3_gCnzgv8Pw2cqG6EtCczbyV5u4eYiY95eIsOvPyABGbc_F7PXf7JLNg0tXpPWpKcb3fhJtvaxjBJzOgcsDDZnr6S2bRghVOyl9pQvaNhe4CnzzKquSjuwZ6tlV2e63SfM6pWUP97BiG9Jn-fsISlCsabr0ui04Ih14EOnaVJWWKZNKIOTW3I6D1xTmIi5zoAHeEkg6Gd_9b2hadBGMvwh1ftvXzZjJ-lco0cHYNFEfVJ5ngKq_Kg2ZbfL4H6OxXnALC7J0mnIEH_QBn92U8qtMMKZtO2dDS6rBtnTjY7rdndWSLkZ9Y89oW2vMZb2dRlXtAaPZ6QkLtlnCao2ncDIa7Ysr2oH7E-2bbsh4cPIY5IbnXNFYxbq7aCJ2uMu-mAbljTyed_NP5axgxwXyV_VdnP4qGqRl-Jp9Q.1wj3-S8REID1ufTFqfYMKw"
        },
        "accessToken": {
            "jwtToken": "eyJraWQiOiJRQ3lQb3ZURDg2MWppOTB0WGR1QWlsaXVmbjBKb2xwdHNraEZ6OTV0cWo0PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJiYjU4M2IyMC04MDFmLTQwY2MtYmU4ZS1mNjgyYzZmZThjMzIiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtY2VudHJhbC0xLmFtYXpvbmF3cy5jb21cL2V1LWNlbnRyYWwtMV81SXNmR1E5TDkiLCJjbGllbnRfaWQiOiI2cXBqbjZkbGQ3OWJhNDU4cG9rMW1rMjVjdCIsIm9yaWdpbl9qdGkiOiI1YmVkZmYwMi0xM2E5LTQwNDktOWI1Ni1lN2IwNzcwNDc1NDgiLCJldmVudF9pZCI6IjI2YjA2ZWM1LWNkMDMtNGQzYS1hZGIwLWRiY2YxMTQ3N2E2OCIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE3MjU5NzA4ODYsImV4cCI6MTcyNjA1NzI4NiwiaWF0IjoxNzI1OTcwODg2LCJqdGkiOiI5NDlhYjcxNS00MWMyLTRkMWQtOTI1OC01MWY1Y2NiNzM0YTEiLCJ1c2VybmFtZSI6ImJiNTgzYjIwLTgwMWYtNDBjYy1iZThlLWY2ODJjNmZlOGMzMiJ9.i2hq5oc-uP6mId-RFngRMVjVrjGcdqkKwPOO7E7JgydXUmaIg6_2fAynFtkyo0i-NeCEFv3_90aBwhRKRnedJVjSJilvvfKfX1doaL5X9QaWa_cNXFhSIF6iYJ-nd1zj6teWWdjjlnyt6W4yLKzJNcdbsIlcQaw2x38vPgWWnSwy9MWQ-tBslI-PhYm9SS9zfp81SBPpch1pyUEgJAwRFC9ZhCDvvs4UshRikDVQFTSfSmQlU_0MCkHM-hSv4ATCCA4giH-_-gl0o59wOFc_LD92jSS0EhUkbGkCaQEmlLt8VKSfJjN4y0uIr6u3sv4K5DIsrcG9luEKp0aFbjW38w",
            "payload": {
                "sub": "bb583b20-801f-40cc-be8e-f682c6fe8c32",
                "iss": "https://cognito-idp.eu-central-1.amazonaws.com/eu-central-1_5IsfGQ9L9",
                "client_id": "6qpjn6dld79ba458pok1mk25ct",
                "origin_jti": "5bedff02-13a9-4049-9b56-e7b077047548",
                "event_id": "26b06ec5-cd03-4d3a-adb0-dbcf11477a68",
                "token_use": "access",
                "scope": "aws.cognito.signin.user.admin",
                "auth_time": 1725970886,
                "exp": 1726057286,
                "iat": 1725970886,
                "jti": "949ab715-41c2-4d1d-9258-51f5ccb734a1",
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
