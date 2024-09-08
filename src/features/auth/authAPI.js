import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const data = {
  "idToken": {
      "jwtToken": "eyJraWQiOiJXcnBEXC9JcTA4b1o5WGFpUEszYWllRlArZHUrcENIelwvWHhZb0JlK1F6VWc9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJiYjU4M2IyMC04MDFmLTQwY2MtYmU4ZS1mNjgyYzZmZThjMzIiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS1jZW50cmFsLTEuYW1hem9uYXdzLmNvbVwvZXUtY2VudHJhbC0xXzVJc2ZHUTlMOSIsImNvZ25pdG86dXNlcm5hbWUiOiJiYjU4M2IyMC04MDFmLTQwY2MtYmU4ZS1mNjgyYzZmZThjMzIiLCJjdXN0b206b3JnYW5pemF0aW9uSWQiOiJhYmExN2M3Yi1hNGYxLTRhMDgtYWUxMi0yNWY4Njg3NmRmMTIiLCJjdXN0b206dXNlcklkIjoiZGNiYTNlZGYtYjFmMS00NmI0LWJmMjgtZmNhZTY0YjlhNGY0Iiwib3JpZ2luX2p0aSI6IjFiNzBmZWFmLTk1MzAtNDcwZi1hODJhLWRmMWJkZWQ3MmU1MSIsImF1ZCI6IjZxcGpuNmRsZDc5YmE0NThwb2sxbWsyNWN0IiwiZXZlbnRfaWQiOiJiYWI5ZjI3MS05ZGE5LTQ5ZTktOGM0Ny1iMzFkMGFhMWJmODciLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTcyNTgwMDg1MywibmFtZSI6IkNhbmRpZGF0ZSIsImN1c3RvbTpvcmdhbml6YXRpb25Sb2xlIjoiMSIsImV4cCI6MTcyNTg4NzI1MywiY3VzdG9tOnJvbGUiOiI5MDAiLCJpYXQiOjE3MjU4MDA4NTMsImZhbWlseV9uYW1lIjoiRGlnaXRvcGlhIiwianRpIjoiNWUzZTkwOGQtZWRhYy00MDczLThhYmEtYzE5MWEzMzYyMGRmIiwiZW1haWwiOiJzZW1hbnVycnJhcnNsYW5AZ21haWwuY29tIn0.LSKMHqQVDjOXePVojk3OqkP_cxQixWCW443AuKhQRT1j740fgJov7lhaUPbUd7wqOuQW3oPYmWHLFqRK6A7hDdk98aemNXoMqsLpszCyEYLUGwbbcpQKkbG-GJ-6KedeJpaHYrkgk4zUtvPSZmPJ_RDMHMpDqxWhrxbvC-rk7dNKPFfRZYtKRKnAM3hg5H1koHQx-Wu0OxhJKjNWxWzoVlCwp9v90Qz3LZLcnRSim9gr17U_x_zGJkwugpFyY107uruDkTIeL2fDJgSk0pgIE5oJ2K-ds9TjbPXfIInwQu5X2cJHI8aOx-0k7qO_Y1B4zfiyVRNZvGh2_LwalE2U7g",
      "payload": {
          "sub": "bb583b20-801f-40cc-be8e-f682c6fe8c32",
          "email_verified": false,
          "iss": "https://cognito-idp.eu-central-1.amazonaws.com/eu-central-1_5IsfGQ9L9",
          "cognito:username": "bb583b20-801f-40cc-be8e-f682c6fe8c32",
          "custom:organizationId": "aba17c7b-a4f1-4a08-ae12-25f86876df12",
          "custom:userId": "dcba3edf-b1f1-46b4-bf28-fcae64b9a4f4",
          "origin_jti": "1b70feaf-9530-470f-a82a-df1bded72e51",
          "aud": "6qpjn6dld79ba458pok1mk25ct",
          "event_id": "bab9f271-9da9-49e9-8c47-b31d0aa1bf87",
          "token_use": "id",
          "auth_time": 1725800853,
          "name": "Candidate",
          "custom:organizationRole": "1",
          "exp": 1725887253,
          "custom:role": "900",
          "iat": 1725800853,
          "family_name": "Digitopia",
          "jti": "5e3e908d-edac-4073-8aba-c191a33620df",
          "email": "semanurrrarslan@gmail.com"
      }
  },
  "refreshToken": {
      "token": "eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.NPNJZk_Ip2sVcap9EeIXNVnxQl8hanGZfnhqdCP9955FOFYPXWyWHDoFof79VKHFWfcqXDFkSkVjp0rtywN7p01HOhMvql3WNjsI6o_K2lWblwFL-RylfdGhAaKKELRbuDG-yaeFNFFS7rB__1Ose2POYrR1fuL-2BYisDa77XgGqa7ioXfCqYhVkwd7s_rU2_ALo33x8pHOT1lrwWu2xVSM8P8sVzRP8urX4gp7XF9vN30AIQL3UQnba1XlxxLcDQw--nUHCRquReb71nr_AZl7JqGPpTha6O2L1EOLxCMdr94SL4HOlBztiXuwpA15Jf1W7oOHPAPL-JW91NYLgA.CPixNbvE4wMFl4r6.RaCd9afcnVENvTSBfKuCHbk5_3FpUY2cuD0NxxxBavSfjanRIq_TCzzxMty7I9G-mQf8hxp80fag15xMHQvUS2DTR1zteIWNUC2A15oE0dEbAAw6N1kbBFvgPIp1KgJksPuRK-IatewNk1m0zQtvm8SAdfsYo9Eypo7uYumtVyiKRhyWB37Vzo0vniGQ5Sao_aIs8WE0AT2c9evPVY7Kn5xtGfATv89JODW9qwtXUtQfUp_hYpfOpJLx1QfRH9eiuViTxfg6pLdlGDI4czo9SVmENVLKoghsAYu86Y5mbR1g-GB8EMyfk6k0ku3oqOKiXl2f3TRBV-D1XaP8KdiCXrWC5kBLmSR0R8rP0R0APeUyuqACZq8rqcQoUNUK38zA7BR4VJtX119v3xwlT1gQ5Z3_MT516a5B_J5xR9QqeVsV19zX8igTQjrjvVttKj1cz_HEkBX51AoLocp9C6kSvbwUjHFKmRVRisPy6pTjfgqSYIgm3E9If-ZSCNPcX2Kt0_TzGpsWqyboCBB-FPtBtvKb4UhbP3oko_dIncU8w4x0NDkOeYIcr9-R5YVIVm9xp_ItcSpygNeTwImeSo6yyUmZR0IiULamMPKvihILJpBOX4qV13SE12hW_I81iMziXfH3Ly7eDyA9EIEynr9w1nFs69TXFi1zaSRDb8bmqxPNBe1o4V75AlJGLMXoXLUfHVZhx3O2c6SeRGqQ2lGClO7218pd_r9plhcvEmvdkWbtdcE_8fsKrCDuojTPhIGmR7Komz3BoACUzKZ2ua-xKOr3NADlVoBR38tL8B4FLS8S5JgmztK5CiTGx75_oGCITTc6lEoaqcl0YWZd9HH2FCoxxqLg28IK8daKMFkagyrksO6VCXIQk-kNQwL31Q2c8PsK5YuMs3BqC41h-6tXK_k5M5M3D88XLc9zf7zeQgyBmR2JtxuXUwBxilhSbLxEb08FLpAPPvGuqtsDocqV9MPX-V2c2OEdnFIfgDyTZrPH13tAsJsra2R3gHMs9jw-p5Fgz8S7y9DdJJaZ8wknwvGX4nizdsiHx82hy6JTspw1IwsdXkkgFzn7opzkn_NTc3dmG6dzDSDC2b5lKbJ7S9W0ohspX7yckkpNQK3FZ9nN2M10TRXvXUxGS0c8wz0bGypFS9dszesWnddTAYsTexwWQFWRYO15yO7hsGSUE8_luF-CxcfbJxVOhAGxBSdIPczj6e5_LxnQ4uS_QNIuMXdZxfoZcRvgZqWnRbmm-GRCb79ap0A4N_z8iO-oQCwQ4mNHquTYVyD-OTctkuhMV9cdENcFpJWY4XVS5_D1We-nHI4oBNYnnxqgKa6ibEj9oLD3-A.fPbh1102fs-fj_B_zpqJCQ"
  },
  "accessToken": {
      "jwtToken": "eyJraWQiOiJRQ3lQb3ZURDg2MWppOTB0WGR1QWlsaXVmbjBKb2xwdHNraEZ6OTV0cWo0PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJiYjU4M2IyMC04MDFmLTQwY2MtYmU4ZS1mNjgyYzZmZThjMzIiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtY2VudHJhbC0xLmFtYXpvbmF3cy5jb21cL2V1LWNlbnRyYWwtMV81SXNmR1E5TDkiLCJjbGllbnRfaWQiOiI2cXBqbjZkbGQ3OWJhNDU4cG9rMW1rMjVjdCIsIm9yaWdpbl9qdGkiOiIxYjcwZmVhZi05NTMwLTQ3MGYtYTgyYS1kZjFiZGVkNzJlNTEiLCJldmVudF9pZCI6ImJhYjlmMjcxLTlkYTktNDllOS04YzQ3LWIzMWQwYWExYmY4NyIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE3MjU4MDA4NTMsImV4cCI6MTcyNTg4NzI1MywiaWF0IjoxNzI1ODAwODUzLCJqdGkiOiIwMTgyYjEwOC03M2JjLTQxMTItODQyMy1kZTc2OWQ2ZjQ3YzkiLCJ1c2VybmFtZSI6ImJiNTgzYjIwLTgwMWYtNDBjYy1iZThlLWY2ODJjNmZlOGMzMiJ9.gAGKiiwLwa46ucNkqzM0XpSuJJfDGQvPuPAYCBlv105lS2yk5j-DM2rVdsEhDbihot8qmXykqQKAoEhh7j-YsnW5AXs3RaLf7GB73riru1n1drHOEWbTtTsOP9d2aa4wofF4MiSGAtgFvd9ENlziE8-uwbI0-BV8ymONMd_A0Q8hMDqtxaynTYVkeGezZ3xmd9YaTSUm5WiJOw98jSbPyEC4_56Q-L7pL2V5oQ1YJXxXAZROOZjTMqaR8sN_Ng4EPr1uJvT_JxCJZTzs214EVI-6h2Q4as5MYdATNvnowKfnaYUvrjZly6CdI1MEBlbX3_-t1q6o5KVSElBuJelupQ",
      "payload": {
          "sub": "bb583b20-801f-40cc-be8e-f682c6fe8c32",
          "iss": "https://cognito-idp.eu-central-1.amazonaws.com/eu-central-1_5IsfGQ9L9",
          "client_id": "6qpjn6dld79ba458pok1mk25ct",
          "origin_jti": "1b70feaf-9530-470f-a82a-df1bded72e51",
          "event_id": "bab9f271-9da9-49e9-8c47-b31d0aa1bf87",
          "token_use": "access",
          "scope": "aws.cognito.signin.user.admin",
          "auth_time": 1725800853,
          "exp": 1725887253,
          "iat": 1725800853,
          "jti": "0182b108-73bc-4112-8423-de769d6f47c9",
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
