--
-- PostgreSQL database dump
--

-- Dumped from database version 14.10 (Ubuntu 14.10-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.10 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: EnglishLevel; Type: TYPE; Schema: public; Owner: asseradmin
--

CREATE TYPE public."EnglishLevel" AS ENUM (
    'A1',
    'A2',
    'B1',
    'B2',
    'C1',
    'C2'
);


ALTER TYPE public."EnglishLevel" OWNER TO asseradmin;

--
-- Name: NotificationStatus; Type: TYPE; Schema: public; Owner: asseradmin
--

CREATE TYPE public."NotificationStatus" AS ENUM (
    'READ',
    'UNREAD'
);


ALTER TYPE public."NotificationStatus" OWNER TO asseradmin;

--
-- Name: Role; Type: TYPE; Schema: public; Owner: asseradmin
--

CREATE TYPE public."Role" AS ENUM (
    'NEW_STUDENT',
    'ACCEPTED_STUDENT',
    'COMMUNITY_ANGEL',
    'ADMIN'
);


ALTER TYPE public."Role" OWNER TO asseradmin;

--
-- Name: applicationStatus; Type: TYPE; Schema: public; Owner: asseradmin
--

CREATE TYPE public."applicationStatus" AS ENUM (
    'pending',
    'accepted',
    'rejected'
);


ALTER TYPE public."applicationStatus" OWNER TO asseradmin;

--
-- Name: highestQualification; Type: TYPE; Schema: public; Owner: asseradmin
--

CREATE TYPE public."highestQualification" AS ENUM (
    'HighSchool',
    'Bachelor',
    'Master',
    'PhD'
);


ALTER TYPE public."highestQualification" OWNER TO asseradmin;

--
-- Name: searchQueryParamKeys; Type: TYPE; Schema: public; Owner: asseradmin
--

CREATE TYPE public."searchQueryParamKeys" AS ENUM (
    'TuitionFees',
    'Duration',
    'Discipline',
    'Format',
    'Attendance',
    'Degree'
);


ALTER TYPE public."searchQueryParamKeys" OWNER TO asseradmin;

--
-- Name: studyProgramLanguage; Type: TYPE; Schema: public; Owner: asseradmin
--

CREATE TYPE public."studyProgramLanguage" AS ENUM (
    'EN',
    'PL'
);


ALTER TYPE public."studyProgramLanguage" OWNER TO asseradmin;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: asseradmin
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO asseradmin;

--
-- Name: accounts; Type: TABLE; Schema: public; Owner: asseradmin
--

CREATE TABLE public.accounts (
    id text NOT NULL,
    user_id text NOT NULL,
    type text,
    provider text NOT NULL,
    provider_account_id text NOT NULL,
    token_type text,
    refresh_token text,
    access_token text,
    expires_at integer,
    scope text,
    id_token text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone
);


ALTER TABLE public.accounts OWNER TO asseradmin;

--
-- Name: activation_tokens; Type: TABLE; Schema: public; Owner: asseradmin
--

CREATE TABLE public.activation_tokens (
    id text NOT NULL,
    token text NOT NULL,
    "activatedAt" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    user_id text NOT NULL
);


ALTER TABLE public.activation_tokens OWNER TO asseradmin;

--
-- Name: applications; Type: TABLE; Schema: public; Owner: asseradmin
--

CREATE TABLE public.applications (
    id text NOT NULL,
    study_program_id text NOT NULL,
    user_id text NOT NULL,
    user_consent boolean DEFAULT false NOT NULL,
    status public."applicationStatus" DEFAULT 'pending'::public."applicationStatus" NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone
);


ALTER TABLE public.applications OWNER TO asseradmin;

--
-- Name: comments; Type: TABLE; Schema: public; Owner: asseradmin
--

CREATE TABLE public.comments (
    id text NOT NULL,
    content text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    post_id text NOT NULL,
    author_id text NOT NULL
);


ALTER TABLE public.comments OWNER TO asseradmin;

--
-- Name: disciplines; Type: TABLE; Schema: public; Owner: asseradmin
--

CREATE TABLE public.disciplines (
    id text NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.disciplines OWNER TO asseradmin;

--
-- Name: disciplines_on_programs; Type: TABLE; Schema: public; Owner: asseradmin
--

CREATE TABLE public.disciplines_on_programs (
    discipline_id text NOT NULL,
    study_program_id text NOT NULL
);


ALTER TABLE public.disciplines_on_programs OWNER TO asseradmin;

--
-- Name: documents; Type: TABLE; Schema: public; Owner: asseradmin
--

CREATE TABLE public.documents (
    id text NOT NULL,
    application_id text NOT NULL,
    link text
);


ALTER TABLE public.documents OWNER TO asseradmin;

--
-- Name: educational_backgrounds; Type: TABLE; Schema: public; Owner: asseradmin
--

CREATE TABLE public.educational_backgrounds (
    id text NOT NULL,
    application_id text NOT NULL,
    "institutionName" text NOT NULL,
    "graduationYear" integer NOT NULL,
    highest_qualification public."highestQualification" NOT NULL
);


ALTER TABLE public.educational_backgrounds OWNER TO asseradmin;

--
-- Name: likes; Type: TABLE; Schema: public; Owner: asseradmin
--

CREATE TABLE public.likes (
    id text NOT NULL,
    post_id text NOT NULL,
    author_id text NOT NULL
);


ALTER TABLE public.likes OWNER TO asseradmin;

--
-- Name: notifications; Type: TABLE; Schema: public; Owner: asseradmin
--

CREATE TABLE public.notifications (
    id text NOT NULL,
    content text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "readAt" timestamp(3) without time zone,
    status public."NotificationStatus" DEFAULT 'UNREAD'::public."NotificationStatus" NOT NULL,
    user_id text NOT NULL
);


ALTER TABLE public.notifications OWNER TO asseradmin;

--
-- Name: personal_infos; Type: TABLE; Schema: public; Owner: asseradmin
--

CREATE TABLE public.personal_infos (
    id text NOT NULL,
    application_id text NOT NULL,
    "firstName" text NOT NULL,
    "lastName" text NOT NULL,
    email text NOT NULL,
    "phoneNumber" text,
    "dateOfBirth" timestamp(3) without time zone NOT NULL,
    nationality text NOT NULL,
    "languageProficiency" public."EnglishLevel" NOT NULL,
    "nativeLanguage" text NOT NULL
);


ALTER TABLE public.personal_infos OWNER TO asseradmin;

--
-- Name: posts; Type: TABLE; Schema: public; Owner: asseradmin
--

CREATE TABLE public.posts (
    id text NOT NULL,
    title text NOT NULL,
    content text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    author_id text NOT NULL
);


ALTER TABLE public.posts OWNER TO asseradmin;

--
-- Name: sessions; Type: TABLE; Schema: public; Owner: asseradmin
--

CREATE TABLE public.sessions (
    id text NOT NULL,
    user_id text,
    session_token text NOT NULL,
    access_token text,
    expires timestamp(3) without time zone NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.sessions OWNER TO asseradmin;

--
-- Name: study_programs; Type: TABLE; Schema: public; Owner: asseradmin
--

CREATE TABLE public.study_programs (
    id text NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    "startDate" text,
    "degreeType" text NOT NULL,
    attendance text NOT NULL,
    payment_cycle text NOT NULL,
    study_program_link text,
    university_id text NOT NULL,
    tuition_fee integer,
    "IELTS_score" double precision,
    "TOEFL_score" integer,
    duration double precision,
    apply_date text,
    study_program_language public."studyProgramLanguage" DEFAULT 'EN'::public."studyProgramLanguage" NOT NULL,
    format text[]
);


ALTER TABLE public.study_programs OWNER TO asseradmin;

--
-- Name: universities; Type: TABLE; Schema: public; Owner: asseradmin
--

CREATE TABLE public.universities (
    id text NOT NULL,
    name text NOT NULL,
    location text NOT NULL
);


ALTER TABLE public.universities OWNER TO asseradmin;

--
-- Name: users; Type: TABLE; Schema: public; Owner: asseradmin
--

CREATE TABLE public.users (
    id text NOT NULL,
    email character varying(64),
    password text,
    email_verified timestamp(3) without time zone,
    image text,
    first_name character varying(32),
    "isActive" boolean DEFAULT true NOT NULL,
    last_name character varying(32),
    role public."Role" DEFAULT 'NEW_STUDENT'::public."Role" NOT NULL,
    sex character varying(1),
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    favorites text[],
    friend_list text[]
);


ALTER TABLE public.users OWNER TO asseradmin;

--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: asseradmin
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
814f1e1a-0644-4b8f-9f64-c34526569f79	17038ecf9c891b46e4dffaca9a8001b5beae5560c42f9d24d00d705b53894512	2024-01-11 10:51:29.332102+00	20230729220213_init	\N	\N	2024-01-11 10:51:29.062103+00	1
755bc0a2-eeeb-4034-8697-aa0b66656110	a83427eb18697bfadbaba01f21cf9726d9978b8b69cf0f4b45445d4ab3b2eec0	2024-01-11 10:51:34.616249+00	20231014161257_jhg	\N	\N	2024-01-11 10:51:34.350783+00	1
b3ebd1c7-eb7a-453c-b3f6-e082dccda14e	4fa1ada383a11d8b437bcac2b0f7d74cb4bc6360750db84e7847ce65784c4ba3	2024-01-11 10:51:29.71826+00	20230817202516_user_auth	\N	\N	2024-01-11 10:51:29.437147+00	1
b1d690f8-82ba-4dfa-9f6f-f68118e30e7c	4dc8eaba6043d8fe8f8411de42c8979a875189081ccdfd0197f6da51cd452f2a	2024-01-11 10:51:30.090263+00	20230830202304_users1	\N	\N	2024-01-11 10:51:29.822067+00	1
4799ec59-4314-4799-b8c3-ed29ef5ebbe9	641c1935a964a63b4a3d2c763cd954b6e6d8341eefc6912e353009d9af49b216	2024-01-11 10:51:38.020493+00	20231118094650_semi_final	\N	\N	2024-01-11 10:51:37.74767+00	1
1df556d6-87c0-42f6-8b8e-ea5978e36a16	07c979e399f576685231e5af9bd9a758341037fe2df9e42f45829b5261292325	2024-01-11 10:51:30.466386+00	20230902140505_test	\N	\N	2024-01-11 10:51:30.197786+00	1
4d92c52e-61a7-4042-a497-8b8374ea3341	276a03e88d86696a54e58da22c9317657148592fdbf061c161ef0d775e1a8a31	2024-01-11 10:51:35.003597+00	20231014200555_a	\N	\N	2024-01-11 10:51:34.738119+00	1
02bcb8a1-35cf-4b77-b3ca-510e9d2262ab	3fcf111a58b592c92a8a6330b718942fe17b802139367bd2054e050672e64dd4	2024-01-11 10:51:30.843402+00	20230910113031_init2	\N	\N	2024-01-11 10:51:30.573814+00	1
8698b1ca-161b-4e00-b9ef-9670f73465df	db921f855a2cb386282391e32b74ed36b8a1fdeef4bc1f1c40baed3a8ed12543	2024-01-11 10:51:31.20909+00	20230910181034_idk	\N	\N	2024-01-11 10:51:30.947948+00	1
0532aef2-126b-4946-b60d-393e0324fd65	2f4d88a7cc8d5e5ea473a0011f49fed40396ba528b00a884477e4df79e95e37b	2024-01-11 10:51:31.601589+00	20231003064111_unis	\N	\N	2024-01-11 10:51:31.316176+00	1
87694374-b260-4456-aa39-0ead96673331	ac66a41ec81c1dabdd20f3bdb8fce439dcb7155af987d5a174012e8f31fc1d34	2024-01-11 10:51:35.38865+00	20231014201046_	\N	\N	2024-01-11 10:51:35.112752+00	1
b3d9d924-7e9f-4375-99d5-ba8584a76605	a907195a1651b5f4159e141d7e60a6cef1be4409cbcc00840b917ac8361d843e	2024-01-11 10:51:31.969969+00	20231003103652_unis	\N	\N	2024-01-11 10:51:31.712725+00	1
d295cced-23d5-46ed-871b-fc9ba6e645a0	c2a22a7ac2110d915b896b576d38a87b957f06a223954b5f5bc15c3b39d8bb77	2024-01-11 10:51:32.354122+00	20231003105044_unis	\N	\N	2024-01-11 10:51:32.071212+00	1
7d67cd6a-cd55-40ba-aeb8-7644b65b230c	c2560f522bfd24b29fcb37f00b6050575e85b96737e775eff75966f54557e5b1	2024-01-11 10:51:40.288411+00	20231224110959_f	\N	\N	2024-01-11 10:51:40.021523+00	1
831be892-7c0c-47dd-bf65-9330c9a34ac0	88a56c4c04aa7483ca3a8f9dcfc8b2c5bb0c8e858374c444c07405905b54b818	2024-01-11 10:51:32.740444+00	20231005195807_nis	\N	\N	2024-01-11 10:51:32.471356+00	1
1403dd07-8b07-41c8-8a14-8968072e0144	63d78e0cb0e1b2792bf045fd46639b9bc59651b186efb329999886f4953a1e1b	2024-01-11 10:51:35.75015+00	20231014202638_	\N	\N	2024-01-11 10:51:35.492867+00	1
dcd3f8ec-2e94-423a-bd01-d997d7ba82e0	77510d0251b7cbf88c20baa999b650e0552a1ec404099aaed67086fe98c425a0	2024-01-11 10:51:33.102924+00	20231005214505_unis	\N	\N	2024-01-11 10:51:32.841567+00	1
b5aafe01-2b77-4b38-9043-0b5b55e4004d	1b99761fd6ebdf4b5b6b6e23dd3c484edb41bf6146da7bd9347f90e3f0fdc164	2024-01-11 10:51:33.488267+00	20231014141402_2	\N	\N	2024-01-11 10:51:33.207695+00	1
0718aeee-a1fd-47d4-b1e7-8ced1c7cbcd8	3b4edd237ac100f1bfdf6ef635a71e1df8287ffa35e8569018c7583b00d3b500	2024-01-11 10:51:38.382027+00	20231119142351_semi	\N	\N	2024-01-11 10:51:38.128929+00	1
2630c73c-7046-46e7-91ae-b99ee5e5b7ce	4af5cca5c85933934ee552436e45c560985b9922ce4f60ccf77f11648bdd8534	2024-01-11 10:51:33.852049+00	20231014144702_1	\N	\N	2024-01-11 10:51:33.596781+00	1
9fd8c9c4-65bf-4b54-b665-288d37cf3f9b	444313276148af9c73459c48da8e1b4b3cef84c66f95e67c110afe7f06f16301	2024-01-11 10:51:36.121818+00	20231014211343_prog_final	\N	\N	2024-01-11 10:51:35.851227+00	1
7eb1f6b5-00d2-48f5-9df8-d5f3ab104c66	0cdbbaec413848518dad39c166c5fe9312fcb438881ec229330df2bffd448de4	2024-01-11 10:51:34.249532+00	20231014161041_2	\N	\N	2024-01-11 10:51:33.95836+00	1
daf97961-8ec0-425d-b9e8-771b3fb66207	44bd2a75a15537cb2fc5075e6c2c95f8809ff0c26f57fe0ea1253a90fff2362a	2024-01-11 10:51:36.50844+00	20231022160539_bla	\N	\N	2024-01-11 10:51:36.227498+00	1
5c8aa27e-a6f0-4fff-b600-6d68120e130f	0effe0a1ecd42b5018548afe4657227e852b17969ee14f2cd7706dce3d206224	2024-01-11 10:51:36.918569+00	20231102114616_idk	\N	\N	2024-01-11 10:51:36.616091+00	1
13c5f4e5-be33-4d41-885d-07b801a6110a	025342d2ee69b9038666dd7379dcb21fa2f3cb911ced38e32a3152784a7d4ee2	2024-01-11 10:51:38.759957+00	20231120225803_almost	\N	\N	2024-01-11 10:51:38.485429+00	1
0c9f8cae-a48e-4430-a5cd-a5d9e4659821	e500bbbd2c8734308bf23c33d133d5bd8735477eaa546b0dcabe77e3a9a0d781	2024-01-11 10:51:37.274338+00	20231103175814_jgb	\N	\N	2024-01-11 10:51:37.021982+00	1
7e981086-de56-449d-a130-3607cc4c7d31	2fa922948d20ffc6d34c7bf09a705e2d577760513075b0347472f063a6f9246a	2024-01-11 10:51:37.640769+00	20231103211340_iujb	\N	\N	2024-01-11 10:51:37.378495+00	1
e4e57cc2-666f-491c-96e8-4b991fbfe133	642d0d27b3e430b82694c1d4ff6cce0cf4f27a431914e513796f73d76e9059bb	2024-01-11 10:51:39.133432+00	20231127230336_	\N	\N	2024-01-11 10:51:38.863921+00	1
392fb316-ffb7-4a2a-9439-fcd3c5aad3ff	b777552c1203bba2cbf38366ba7dde8b966a18c6bbbac04ee098e5b2a0054c6a	2024-01-11 10:51:40.641589+00	20231224113006_	\N	\N	2024-01-11 10:51:40.390476+00	1
99da29bc-1bf2-4edf-afe2-457e4c7d99f5	4ac1f93ba181a528f1556164ee5b0c500c2a5db06ec0e561a083d801a532bdb8	2024-01-11 10:51:39.504755+00	20231202122312_add_cascade_deletes	\N	\N	2024-01-11 10:51:39.239125+00	1
38f64813-4f4c-40fb-8bbb-639805654a6f	40310770b4a23135a98686be6b8cf892584425cc925d0e685dbfd0ce2f027cf9	2024-01-11 10:51:39.914929+00	20231216080902_final	\N	\N	2024-01-11 10:51:39.604515+00	1
54b890db-09ec-423a-b81d-d786b92f090d	9b0de79cca58a8c04b8f7b4246940c6437abdc12f426763c073e92e0b8e281b8	2024-01-11 10:51:41.007448+00	20231224200820_dsg	\N	\N	2024-01-11 10:51:40.740921+00	1
\.


--
-- Data for Name: accounts; Type: TABLE DATA; Schema: public; Owner: asseradmin
--

COPY public.accounts (id, user_id, type, provider, provider_account_id, token_type, refresh_token, access_token, expires_at, scope, id_token, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: activation_tokens; Type: TABLE DATA; Schema: public; Owner: asseradmin
--

COPY public.activation_tokens (id, token, "activatedAt", "createdAt", "updatedAt", user_id) FROM stdin;
\.


--
-- Data for Name: applications; Type: TABLE DATA; Schema: public; Owner: asseradmin
--

COPY public.applications (id, study_program_id, user_id, user_consent, status, created_at, updated_at) FROM stdin;
clr93g36v001d11wa4xalxwtq	test1	test3	f	pending	2024-01-11 10:55:54.151	2024-01-11 10:55:54.151
clr93g3fd001e11wau0bsdj0m	test2	test4	f	pending	2024-01-11 10:55:54.458	2024-01-11 10:55:54.458
clr93g3ns001f11watkvcx7ki	test3	test5	f	pending	2024-01-11 10:55:54.761	2024-01-11 10:55:54.761
clr93g450001h11wa7wwc0qui	test4	test2	f	pending	2024-01-11 10:55:55.38	2024-01-11 10:55:55.38
clr93g4dh001i11wala2rp7qo	test5	test3	f	pending	2024-01-11 10:55:55.685	2024-01-11 10:55:55.685
clr93g1h1001611wal0mf3tgx	test3	test3	f	rejected	2024-01-11 10:55:51.926	2024-01-11 10:56:38.693
clr93g2gh001a11wav4rs1smi	test2	test3	f	accepted	2024-01-11 10:55:53.202	2024-01-11 10:57:05.899
clr93g18j001511war8gwd349	test2	test2	f	accepted	2024-01-11 10:55:51.619	2024-01-11 11:01:12.536
clr93g3wh001g11waz0cg76zy	test3	test1	f	accepted	2024-01-11 10:55:55.073	2024-01-11 11:15:31.879
clr93g0vj001411wa6o9f9acj	test1	test1	f	rejected	2024-01-11 10:55:51.152	2024-01-11 11:15:50.303
clr93g1pw001711waxyglwa9w	test4	test4	f	accepted	2024-01-11 10:55:52.245	2024-01-11 11:16:40.817
clr93g2y8001c11war8t5sad6	test4	test5	f	accepted	2024-01-11 10:55:53.84	2024-01-11 11:17:38.137
clr93g27a001911way135mfpy	test1	test2	f	accepted	2024-01-11 10:55:52.87	2024-01-11 11:22:23.854
clr93g1ym001811waexte06bg	test5	test5	f	accepted	2024-01-11 10:55:52.558	2024-01-11 11:22:34.589
clr93g2pi001b11wat4dj0zp6	test3	test4	f	pending	2024-01-11 10:55:53.526	2024-01-11 19:25:39.977
\.


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: asseradmin
--

COPY public.comments (id, content, "createdAt", post_id, author_id) FROM stdin;
clr93g01g000311wa4mn4rl26	This is a comment 1 for post 1.	2024-01-11 10:55:50.068	clr93fzyj000111warl5jrnrd	test1
clr93g047000511wazrhaacig	This is a comment 2 for post 1.	2024-01-11 10:55:50.168	clr93fzyj000111warl5jrnrd	test2
clr93g05p000711wawp6w6f4i	This is a comment 3 for post 1.	2024-01-11 10:55:50.222	clr93fzyj000111warl5jrnrd	test3
clr93g08t000b11wa2w57fplf	This is a comment 1 for post 2.	2024-01-11 10:55:50.334	clr93g078000911wap22wuho1	test1
clr93g0al000d11wa1ee3frle	This is a comment 2 for post 2.	2024-01-11 10:55:50.398	clr93g078000911wap22wuho1	test2
clr93g0c5000f11warikb9fzd	This is a comment 3 for post 2.	2024-01-11 10:55:50.454	clr93g078000911wap22wuho1	test3
clr93g0f5000j11wae6ldnfyw	This is a comment 1 for post 3.	2024-01-11 10:55:50.561	clr93g0dj000h11waaf5gd9wg	test1
clr93g0gl000l11waqc73k5zs	This is a comment 2 for post 3.	2024-01-11 10:55:50.613	clr93g0dj000h11waaf5gd9wg	test2
clr93g0i3000n11wan9k3efsj	This is a comment 3 for post 3.	2024-01-11 10:55:50.667	clr93g0dj000h11waaf5gd9wg	test3
clr93g0ky000r11wajb3uzkgb	This is a comment 1 for post 4.	2024-01-11 10:55:50.771	clr93g0jj000p11wacffeis8x	test1
clr93g0mb000t11wadtc3mfba	This is a comment 2 for post 4.	2024-01-11 10:55:50.819	clr93g0jj000p11wacffeis8x	test2
clr93g0o0000v11wa0qvynm1k	This is a comment 3 for post 4.	2024-01-11 10:55:50.88	clr93g0jj000p11wacffeis8x	test3
clr93g0qy000z11waodl80xap	This is a comment 1 for post 5.	2024-01-11 10:55:50.986	clr93g0pg000x11wapkkc9whm	test1
clr93g0sh001111warbs3qr5b	This is a comment 2 for post 5.	2024-01-11 10:55:51.042	clr93g0pg000x11wapkkc9whm	test2
clr93g0u2001311wa75xwaqgr	This is a comment 3 for post 5.	2024-01-11 10:55:51.099	clr93g0pg000x11wapkkc9whm	test3
\.


--
-- Data for Name: disciplines; Type: TABLE DATA; Schema: public; Owner: asseradmin
--

COPY public.disciplines (id, name) FROM stdin;
clr93aqsl00018usd82qnffvu	physics
clr93aqvg00028usd6a6ods95	mathematics
clr93aqwy00038usd1zqx0nhm	chemistry
clr93aqyj00048usd1jkt4uzn	management studies
clr93ar0000058usd9iyic37j	strategic management
clr93ar1j00068usdhyx3cjel	marketing management
clr93ar3000078usddqz64g1b	communication studies
clr93ar4c00088usd16uv0cjy	journalism
clr93ar5u00098usdg4fs5v3d	dentistry
clr93ar76000a8usd112t7eh4	business administration
clr93ar8m000b8usd20knbmac	international business
clr93ara4000c8usd8zbk4y9m	biomedical science
clr93arbi000d8usdddu6as85	medicine
clr93arcy000e8usd6zj62zpu	language studies
clr93areg000f8usd0dfp5axi	teaching english as a foreign language
clr93arfy000g8usd43arfplb	leadership
clr93arhd000h8usd9gxd2kii	international relations
clr93ariu000i8usd09muglbr	international law
clr93ark7000j8usd2kzib25v	graphic design
clr93arlo000k8usd6bbs3bg6	business intelligence
clr93arn6000l8usdf6stcz35	economics
clr93arot000m8usd4kdw6nm5	finance
clr93arqi000n8usdgei6b46p	criminal justice
clr93arrw000o8usd6h260vw4	econometrics
clr93artd000p8usd5dyraemf	accounting
clr93aruu000q8usde7wbe8rc	transportation engineering
clr93arwd000r8usd6xx37pel	aviation studies
clr93arxu000s8usdf1382h3y	computer sciences
clr93arza000t8usdeq0e548p	cyber security
clr93as0q000u8usd0pn2azep	international development
clr93as26000v8usdhw8s6lfr	health sciences
clr93as3m000w8usd6kvbex4r	architecture
clr93as54000x8usd0cpobgw6	design
clr93as6j000y8usdh5w3axgi	urban planning
clr93as7y000z8usd1gmn7gso	civil engineering & construction
clr93as9c00108usdd74rgvit	financial management
clr93asap00118usdg6ts0fle	human computer interaction
clr93asc600128usd0j3papsf	artificial intelligence
clr93asdo00138usdb0tfg0d5	electrical engineering
clr93asff00148usdg3o5fsy8	aerospace engineering
clr93asgv00158usdaufc2ee8	environmental engineering
clr93asia00168usd1mlwaz4s	industrial & systems engineering
clr93asjm00178usd5x28b5sl	general engineering & technology
clr93asky00188usd9m845oz3	energy engineering
clr93asmb00198usd5eco26qh	information technology (it)
clr93asnt001a8usdbi250bt0	mechanical engineering
clr93asp7001b8usdd4lw73hp	mechatronics
clr93asqp001c8usd20up4u4m	automotive engineering
clr93ass6001d8usd9c8h5j0w	information systems
clr93astn001e8usddqor7frl	web technologies & cloud computing
clr93asv2001f8usd9lnh65at	sports management
clr93aswj001g8usdf2tc6bur	sport and exercise science
clr93asxx001h8usdd76ygogf	hospitality management
clr93asze001i8usdedbe8gds	tourism & leisure
clr93at0v001j8usd50tggy8u	public health
clr93at2c001k8usd4z1ocv8k	health administration
clr93at3v001l8usd67xk64gc	occupational health and safety
clr93at5f001m8usd5f69dy1x	area & cultural studies
clr93at73001n8usdfn0ie8t6	archaeology
clr93at8k001o8usdgi8h8omt	history
clr93ata2001p8usd7hug5vea	software engineering
clr93atbk001q8usd133q8cqf	robotics
clr93atd1001r8usd8gli9ulx	electronics & embedded technology
clr93ateq001s8usd1yok9adb	communications engineering
clr93atg4001t8usd33mu6uxp	agriculture
clr93athh001u8usd80c7f5ry	food technology
clr93atiy001v8usdhfba76gn	british studies
clr93atld001w8usd3tzh0hh3	sustainable development
clr93atmw001x8usd823mev8g	cognitive science
clr93atoc001y8usd3uea1tov	political science
clr93atpw001z8usd3p0chk1d	animal science
clr93atrh00208usd27c94i9d	game design
clr93att500218usdcyobcsa9	financial mathematics
clr93atun00228usd0ip423e2	earth sciences
clr93atw500238usdcmshe67v	natural sciences
clr93atxo00248usd8lgv7boz	american and australasian studies
clr93atz700258usd3vou0f9e	european studies
clr93au0m00268usddfhdfox5	engineering management
clr93au2200278usd555ncwpp	production and manufacturing engineering
clr93au4600288usd9a8qgujl	data science & big data
clr93au5q00298usdfoqd5r2c	bio & biomedical engineering
clr93au78002a8usd00lv1wb2	materials science
clr93au8p002b8usd58pjcgp4	linguistics
clr93aua9002c8usd73mp6vn0	midwifery
clr93aubp002d8usd1mq8h1fq	forensic accounting
clr93aud6002e8usd583h93uy	biology
clr93auep002f8usdgiec3q71	genetics
clr93aug8002g8usd0mcgg5l7	chemical engineering
clr93auho002h8usd6iyu6d2f	biochemistry
clr93auj1002i8usd3n3g12vi	iberian studies
clr93aukf002j8usdf5kw9gko	business information systems
clr93aulx002k8usd1m8tec9m	literature
clr93aung002l8usde3reb9x3	biotechnology
clr93aup2002m8usd0pe7cqt4	transport management
clr93auqk002n8usdhig18q55	digital marketing
clr93aus0002o8usddz360ryi	european law
clr93auth002p8usd5wk8adwz	visual arts
clr93auve002q8usd012gerq9	theology and religious studies
clr93auws002r8usdehl43gwe	marketing
clr93auy8002s8usd0i6b08bd	digital media
clr93auzn002t8usd92eb2nht	philosophy
clr93av14002u8usd8p67gffn	environmental economics & policy
clr93av2q002v8usd5gy86w9e	public policy
clr93av4f002w8usd1kmr9eif	asian studies
clr93av5w002x8usd9dqbd46c	project management
clr93av7a002y8usd246092bp	marine engineering
clr93av8x002z8usd9igpa6xk	public relations
clr93avae00308usd0ye75ysc	operations and quality management
clr93avbu00318usd5w246wzh	public administration
clr93avda00328usd6h72chuy	business law
clr93avez00338usd13gje0d9	human resource management
clr93avgc00348usdesp736dz	it management
clr93avhu00358usdgw7r3dwm	nutrition & dietetics
clr93avj900368usd5bozhp2l	investment
clr93avkq00378usdajho376e	anthropology
clr93avmm00388usd3ww6aqyn	psychology
clr93avo300398usd21pzhmjp	nursing
clr93avpi003a8usd2i1wgwjs	food science
clr93avr3003b8usd0v2r82f2	sociology
clr93avsu003c8usd5uuydpzw	machine learning
clr93avug003d8usdbsxx07lc	landscape architecture
clr93avw5003e8usdchqq4ej9	pharmacy
clr93avxl003f8usdgx35fhtk	pharmacology
clr93avz2003g8usd1endd46a	german and scandinavian studies
clr93aw0j003h8usd4u315yjt	film studies
clr93aw1w003i8usd11dkdjuf	media studies & mass media
clr93aw3s003j8usd8l2l4d41	clinical psychology
clr93aw58003k8usd9aze3kj2	supply chain management & logistics
clr93aw7c003l8usd964p0e06	risk management
clr93aw8q003m8usda4019x1a	interior design
clr93awag003n8usd4zvvg59p	slavic studies
clr93awcl003o8usdb1622uvu	liberal arts
clr93awet003p8usdc6w4fsqw	medical imaging
clr93awgq003q8usd8ylndcer	bioinformatics & biostatistics
clr93awis003r8usd7pp2gpsj	legal studies
clr93awkq003s8usda7khbq82	criminal law
clr93awmt003t8usdf9ay492a	criminology
clr93awp5003u8usdhiqie3lj	ethnic studies
test1	testName 1
test2	testName 2
test3	testName 3
test4	testName 4
test5	testName 5
\.


--
-- Data for Name: disciplines_on_programs; Type: TABLE DATA; Schema: public; Owner: asseradmin
--

COPY public.disciplines_on_programs (discipline_id, study_program_id) FROM stdin;
clr93aqsl00018usd82qnffvu	clr93az3y005f8usdav22gtqm
clr93aqvg00028usd6a6ods95	clr93az3y005f8usdav22gtqm
clr93aqwy00038usd1zqx0nhm	clr93az3y005f8usdav22gtqm
clr93aqyj00048usd1jkt4uzn	clr93azfj005g8usdgfkzf470
clr93ar0000058usd9iyic37j	clr93azfj005g8usdgfkzf470
clr93ar1j00068usdhyx3cjel	clr93azfj005g8usdgfkzf470
clr93ar3000078usddqz64g1b	clr93azml005h8usd9bam509b
clr93ar4c00088usd16uv0cjy	clr93azml005h8usd9bam509b
clr93ar5u00098usdg4fs5v3d	clr93aztv005i8usdaaru42u9
clr93ar76000a8usd112t7eh4	clr93b00u005j8usd8vp98c6h
clr93aqyj00048usd1jkt4uzn	clr93b00u005j8usd8vp98c6h
clr93ar8m000b8usd20knbmac	clr93b00u005j8usd8vp98c6h
clr93ara4000c8usd8zbk4y9m	clr93b07x005k8usd9we34w8c
clr93arbi000d8usdddu6as85	clr93b07x005k8usd9we34w8c
clr93arcy000e8usd6zj62zpu	clr93b0fc005l8usda40298zr
clr93areg000f8usd0dfp5axi	clr93b0fc005l8usda40298zr
clr93ar76000a8usd112t7eh4	clr93b0mp005m8usd2fuo6u85
clr93arfy000g8usd43arfplb	clr93b0mp005m8usd2fuo6u85
clr93arhd000h8usd9gxd2kii	clr93b0tx005n8usdgfb40wkt
clr93ariu000i8usd09muglbr	clr93b0tx005n8usdgfb40wkt
clr93ar8m000b8usd20knbmac	clr93b0tx005n8usdgfb40wkt
clr93ark7000j8usd2kzib25v	clr93b112005o8usd1ccj4l6r
clr93ar76000a8usd112t7eh4	clr93b18e005p8usdd952hxo7
clr93arlo000k8usd6bbs3bg6	clr93b18e005p8usdd952hxo7
clr93ar8m000b8usd20knbmac	clr93b18e005p8usdd952hxo7
clr93arn6000l8usdf6stcz35	clr93b1gg005q8usd23nvfk9a
clr93ar76000a8usd112t7eh4	clr93b1gg005q8usd23nvfk9a
clr93arot000m8usd4kdw6nm5	clr93b1gg005q8usd23nvfk9a
clr93arqi000n8usdgei6b46p	clr93b1ni005r8usd7ys6cg0v
clr93arn6000l8usdf6stcz35	clr93b1uw005s8usd1vbxa4gt
clr93arrw000o8usd6h260vw4	clr93b1uw005s8usd1vbxa4gt
clr93arot000m8usd4kdw6nm5	clr93b223005t8usdcb7ogos2
clr93artd000p8usd5dyraemf	clr93b223005t8usdcb7ogos2
clr93aruu000q8usde7wbe8rc	clr93b2aw005u8usdg15e643l
clr93arwd000r8usd6xx37pel	clr93b2aw005u8usdg15e643l
clr93arxu000s8usdf1382h3y	clr93b2hx005v8usddjotgftj
clr93arza000t8usdeq0e548p	clr93b2hx005v8usddjotgftj
clr93arhd000h8usd9gxd2kii	clr93b2p1005w8usd2espalla
clr93as0q000u8usd0pn2azep	clr93b2p1005w8usd2espalla
clr93ar8m000b8usd20knbmac	clr93b2p1005w8usd2espalla
clr93arbi000d8usdddu6as85	clr93b2wh005x8usdfuum8ml7
clr93as26000v8usdhw8s6lfr	clr93b2wh005x8usdfuum8ml7
clr93aqyj00048usd1jkt4uzn	clr93b33x005y8usd3fwp57ak
clr93ar0000058usd9iyic37j	clr93b33x005y8usd3fwp57ak
clr93as3m000w8usd6kvbex4r	clr93b3av005z8usd8ap3gp5d
clr93as54000x8usd0cpobgw6	clr93b3av005z8usd8ap3gp5d
clr93as6j000y8usdh5w3axgi	clr93b3av005z8usd8ap3gp5d
clr93as7y000z8usd1gmn7gso	clr93b3hz00608usd8orfa9t3
clr93as3m000w8usd6kvbex4r	clr93b3pd00618usdb3635smf
clr93as54000x8usd0cpobgw6	clr93b3pd00618usdb3635smf
clr93as6j000y8usdh5w3axgi	clr93b3pd00618usdb3635smf
clr93as9c00108usdd74rgvit	clr93b3wb00628usd7kvy8fve
clr93aqyj00048usd1jkt4uzn	clr93b43c00638usdb511hd0l
clr93asap00118usdg6ts0fle	clr93b43c00638usdb511hd0l
clr93asc600128usd0j3papsf	clr93b43c00638usdb511hd0l
clr93asdo00138usdb0tfg0d5	clr93b4a700648usdf14m1xgj
clr93asff00148usdg3o5fsy8	clr93b4h900658usdgpjmbtlo
clr93asgv00158usdaufc2ee8	clr93b4o500668usd5z4xh8st
clr93ar76000a8usd112t7eh4	clr93b4v400678usdc5y3e0cx
clr93aqyj00048usd1jkt4uzn	clr93b4v400678usdc5y3e0cx
clr93asia00168usd1mlwaz4s	clr93b52300688usd758n0hqd
clr93asjm00178usd5x28b5sl	clr93b52300688usd758n0hqd
clr93asdo00138usdb0tfg0d5	clr93b59200698usd3f2l9kl9
clr93asky00188usd9m845oz3	clr93b59200698usd3f2l9kl9
clr93asjm00178usd5x28b5sl	clr93b59200698usd3f2l9kl9
clr93ar3000078usddqz64g1b	clr93b5fv006a8usdd3zq8n0i
clr93asmb00198usd5eco26qh	clr93b5fv006a8usdd3zq8n0i
clr93arxu000s8usdf1382h3y	clr93b5fv006a8usdd3zq8n0i
clr93asnt001a8usdbi250bt0	clr93b5mp006b8usdg2ia5znq
clr93asjm00178usd5x28b5sl	clr93b5mp006b8usdg2ia5znq
clr93asp7001b8usdd4lw73hp	clr93b5mp006b8usdg2ia5znq
clr93asdo00138usdb0tfg0d5	clr93b5u5006c8usd1q3j1rk9
clr93asqp001c8usd20up4u4m	clr93b5u5006c8usd1q3j1rk9
clr93arxu000s8usdf1382h3y	clr93b61r006d8usdc36m0jsw
clr93ass6001d8usd9c8h5j0w	clr93b61r006d8usdc36m0jsw
clr93arxu000s8usdf1382h3y	clr93b68z006e8usdg4rkh3ms
clr93astn001e8usddqor7frl	clr93b68z006e8usdg4rkh3ms
clr93asv2001f8usd9lnh65at	clr93b6fp006f8usd6gahf9ij
clr93aswj001g8usdf2tc6bur	clr93b6fp006f8usd6gahf9ij
clr93asxx001h8usdd76ygogf	clr93b6mt006g8usdb42m5yvn
clr93asze001i8usdedbe8gds	clr93b6mt006g8usdb42m5yvn
clr93at0v001j8usd50tggy8u	clr93b6ue006h8usd746pc17i
clr93at2c001k8usd4z1ocv8k	clr93b6ue006h8usd746pc17i
clr93as26000v8usdhw8s6lfr	clr93b6ue006h8usd746pc17i
clr93at0v001j8usd50tggy8u	clr93b71o006i8usde3am3109
clr93as26000v8usdhw8s6lfr	clr93b71o006i8usde3am3109
clr93at3v001l8usd67xk64gc	clr93b71o006i8usde3am3109
clr93at5f001m8usd5f69dy1x	clr93b78l006j8usd36rb2vo4
clr93at73001n8usdfn0ie8t6	clr93b78l006j8usd36rb2vo4
clr93at8k001o8usdgi8h8omt	clr93b78l006j8usd36rb2vo4
clr93asc600128usd0j3papsf	clr93b7fo006k8usdhrpp8rd7
clr93arxu000s8usdf1382h3y	clr93b7mt006l8usdd5yg0kma
clr93ata2001p8usd7hug5vea	clr93b7mt006l8usdd5yg0kma
clr93atbk001q8usd133q8cqf	clr93b7tx006m8usd9297990o
clr93asc600128usd0j3papsf	clr93b7tx006m8usd9297990o
clr93arn6000l8usdf6stcz35	clr93b80x006n8usd7455e52n
clr93ar8m000b8usd20knbmac	clr93b80x006n8usd7455e52n
clr93atd1001r8usd8gli9ulx	clr93b88c006o8usdfc2b9lak
clr93ateq001s8usd1yok9adb	clr93b88c006o8usdfc2b9lak
clr93atg4001t8usd33mu6uxp	clr93b8fu006p8usda266goat
clr93athh001u8usd80c7f5ry	clr93b8fu006p8usda266goat
clr93arcy000e8usd6zj62zpu	clr93b8n9006q8usd3e9q0fi0
clr93atiy001v8usdhfba76gn	clr93b8n9006q8usd3e9q0fi0
clr93arxu000s8usdf1382h3y	clr93b8uh006r8usd8w8t1846
clr93ata2001p8usd7hug5vea	clr93b8uh006r8usd8w8t1846
clr93asc600128usd0j3papsf	clr93b8uh006r8usd8w8t1846
clr93arhd000h8usd9gxd2kii	clr93b91g006s8usd9zsq5y4q
clr93as0q000u8usd0pn2azep	clr93b91g006s8usd9zsq5y4q
clr93atld001w8usd3tzh0hh3	clr93b91g006s8usd9zsq5y4q
clr93artd000p8usd5dyraemf	clr93b999006t8usd2nhefxfe
clr93as9c00108usdd74rgvit	clr93b999006t8usd2nhefxfe
clr93arxu000s8usdf1382h3y	clr93b9gp006u8usd55k0ganx
clr93astn001e8usddqor7frl	clr93b9gp006u8usd55k0ganx
clr93ata2001p8usd7hug5vea	clr93b9gp006u8usd55k0ganx
clr93asdo00138usdb0tfg0d5	clr93b9ns006v8usd5txdd2f8
clr93atd1001r8usd8gli9ulx	clr93b9ns006v8usd5txdd2f8
clr93asjm00178usd5x28b5sl	clr93b9ns006v8usd5txdd2f8
clr93as3m000w8usd6kvbex4r	clr93b9uy006w8usdgqgb5gxl
clr93atmw001x8usd823mev8g	clr93ba21006x8usdfuothmk1
clr93atoc001y8usd3uea1tov	clr93ba21006x8usdfuothmk1
clr93asky00188usd9m845oz3	clr93ba8y006y8usdbaw83ryf
clr93asmb00198usd5eco26qh	clr93bafz006z8usd87cbfqcc
clr93arxu000s8usdf1382h3y	clr93bafz006z8usd87cbfqcc
clr93atpw001z8usd3p0chk1d	clr93banv00708usdegds69tb
clr93atrh00208usd27c94i9d	clr93baur00718usd9c5d4els
clr93arhd000h8usd9gxd2kii	clr93bb1r00728usd074o52gd
clr93arhd000h8usd9gxd2kii	clr93bb8r00738usdebewcnc5
clr93arot000m8usd4kdw6nm5	clr93bbfn00748usd9cum6jem
clr93artd000p8usd5dyraemf	clr93bbfn00748usd9cum6jem
clr93att500218usdcyobcsa9	clr93bbfn00748usd9cum6jem
clr93ar76000a8usd112t7eh4	clr93bbmp00758usdccxm9hbh
clr93arot000m8usd4kdw6nm5	clr93bbmp00758usdccxm9hbh
clr93artd000p8usd5dyraemf	clr93bbmp00758usdccxm9hbh
clr93arn6000l8usdf6stcz35	clr93bbtx00768usdf1kgg987
clr93arot000m8usd4kdw6nm5	clr93bbtx00768usdf1kgg987
clr93arrw000o8usd6h260vw4	clr93bbtx00768usdf1kgg987
clr93as3m000w8usd6kvbex4r	clr93bc0v00778usdha53b9dq
clr93atun00228usd0ip423e2	clr93bc8300788usdh3k23ueu
clr93atw500238usdcmshe67v	clr93bc8300788usdh3k23ueu
clr93atxo00248usd8lgv7boz	clr93bcf200798usd0jcf3i3b
clr93atz700258usd3vou0f9e	clr93bcm4007a8usd341mbqtc
clr93au0m00268usddfhdfox5	clr93bctc007b8usd8eq4akcw
clr93au2200278usd555ncwpp	clr93bctc007b8usd8eq4akcw
clr93aqyj00048usd1jkt4uzn	clr93bd0l007c8usdh4lra4e8
clr93au0m00268usddfhdfox5	clr93bd0l007c8usdh4lra4e8
clr93arn6000l8usdf6stcz35	clr93bd7j007d8usd7etc2ln3
clr93as0q000u8usd0pn2azep	clr93bden007e8usd6kv828x6
clr93ar8m000b8usd20knbmac	clr93bden007e8usd6kv828x6
clr93atxo00248usd8lgv7boz	clr93bden007e8usd6kv828x6
clr93arxu000s8usdf1382h3y	clr93bdlr007f8usda5okefsq
clr93au4600288usd9a8qgujl	clr93bdlr007f8usda5okefsq
clr93au5q00298usdfoqd5r2c	clr93bdsy007g8usd6hd07k33
clr93au78002a8usd00lv1wb2	clr93bdsy007g8usd6hd07k33
clr93asjm00178usd5x28b5sl	clr93bdsy007g8usd6hd07k33
clr93at5f001m8usd5f69dy1x	clr93be1m007h8usdhmp641kt
clr93ar3000078usddqz64g1b	clr93be1m007h8usdhmp641kt
clr93au8p002b8usd58pjcgp4	clr93be1m007h8usdhmp641kt
clr93arbi000d8usdddu6as85	clr93be8y007i8usddgxvafqb
clr93as26000v8usdhw8s6lfr	clr93be8y007i8usddgxvafqb
clr93aua9002c8usd73mp6vn0	clr93be8y007i8usddgxvafqb
clr93arot000m8usd4kdw6nm5	clr93bega007j8usdaz0dd2vv
clr93artd000p8usd5dyraemf	clr93bega007j8usdaz0dd2vv
clr93aubp002d8usd1mq8h1fq	clr93bega007j8usdaz0dd2vv
clr93ara4000c8usd8zbk4y9m	clr93ben9007k8usdhpr65cto
clr93aud6002e8usd583h93uy	clr93ben9007k8usdhpr65cto
clr93auep002f8usdgiec3q71	clr93ben9007k8usdhpr65cto
clr93asdo00138usdb0tfg0d5	clr93beuc007l8usd5hwh2j6o
clr93atd1001r8usd8gli9ulx	clr93beuc007l8usd5hwh2j6o
clr93asdo00138usdb0tfg0d5	clr93bf1m007m8usd1xqd4hm8
clr93asky00188usd9m845oz3	clr93bf1m007m8usd1xqd4hm8
clr93asjm00178usd5x28b5sl	clr93bf1m007m8usd1xqd4hm8
clr93asnt001a8usdbi250bt0	clr93bf93007n8usdfbm083wg
clr93asjm00178usd5x28b5sl	clr93bf93007n8usdfbm083wg
clr93aqyj00048usd1jkt4uzn	clr93bfgb007o8usd9961dm5f
clr93ar0000058usd9iyic37j	clr93bfgb007o8usd9961dm5f
clr93aqyj00048usd1jkt4uzn	clr93bfng007p8usd2zcx75fc
clr93atpw001z8usd3p0chk1d	clr93bfng007p8usd2zcx75fc
clr93ar3000078usddqz64g1b	clr93bfuy007q8usdb2vk377u
clr93ar4c00088usd16uv0cjy	clr93bfuy007q8usdb2vk377u
clr93aug8002g8usd0mcgg5l7	clr93bg2r007r8usddt1q4eep
clr93aqwy00038usd1zqx0nhm	clr93bg2r007r8usddt1q4eep
clr93auho002h8usd6iyu6d2f	clr93bg2r007r8usddt1q4eep
clr93arcy000e8usd6zj62zpu	clr93bga5007s8usddrz92lzw
clr93auj1002i8usd3n3g12vi	clr93bga5007s8usddrz92lzw
clr93atiy001v8usdhfba76gn	clr93bga5007s8usddrz92lzw
clr93atw500238usdcmshe67v	clr93bghj007t8usd0nhj94i3
clr93as7y000z8usd1gmn7gso	clr93bgox007u8usd0dkehc56
clr93asdo00138usdb0tfg0d5	clr93bgox007u8usd0dkehc56
clr93arlo000k8usd6bbs3bg6	clr93bgwi007v8usd9qvgfnnz
clr93aukf002j8usdf5kw9gko	clr93bgwi007v8usd9qvgfnnz
clr93asmb00198usd5eco26qh	clr93bh3o007w8usddfdnh5q5
clr93ata2001p8usd7hug5vea	clr93bh3o007w8usddfdnh5q5
clr93asc600128usd0j3papsf	clr93bh3o007w8usddfdnh5q5
clr93arcy000e8usd6zj62zpu	clr93bhat007x8usd388i2qni
clr93aulx002k8usd1m8tec9m	clr93bhat007x8usd388i2qni
clr93atiy001v8usdhfba76gn	clr93bhat007x8usd388i2qni
clr93arxu000s8usdf1382h3y	clr93bhi8007y8usdbygx7vt1
clr93aud6002e8usd583h93uy	clr93bhq3007z8usd0zhc8qvv
clr93aung002l8usde3reb9x3	clr93bhq3007z8usd0zhc8qvv
clr93auep002f8usdgiec3q71	clr93bhq3007z8usd0zhc8qvv
clr93ar0000058usd9iyic37j	clr93bhx800808usdflx8bm5h
clr93aup2002m8usd0pe7cqt4	clr93bhx800808usdflx8bm5h
clr93aruu000q8usde7wbe8rc	clr93bhx800808usdflx8bm5h
clr93aqyj00048usd1jkt4uzn	clr93bi4e00818usdcer7axgj
clr93auqk002n8usdhig18q55	clr93bi4e00818usdcer7axgj
clr93aus0002o8usddz360ryi	clr93bibe00828usdd4fe56cx
clr93at5f001m8usd5f69dy1x	clr93bibe00828usdd4fe56cx
clr93atz700258usd3vou0f9e	clr93bibe00828usdd4fe56cx
clr93as54000x8usd0cpobgw6	clr93biii00838usd77y86sgw
clr93auth002p8usd5wk8adwz	clr93biii00838usd77y86sgw
clr93ark7000j8usd2kzib25v	clr93biii00838usd77y86sgw
clr93arcy000e8usd6zj62zpu	clr93bipd00848usd5n0db6k7
clr93atiy001v8usdhfba76gn	clr93bipd00848usd5n0db6k7
clr93at5f001m8usd5f69dy1x	clr93biwi00858usd97uffu09
clr93auve002q8usd012gerq9	clr93biwi00858usd97uffu09
clr93arn6000l8usdf6stcz35	clr93bj3v00868usdba5fhomu
clr93arlo000k8usd6bbs3bg6	clr93bj3v00868usdba5fhomu
clr93au4600288usd9a8qgujl	clr93bj3v00868usdba5fhomu
clr93auws002r8usdehl43gwe	clr93bjaw00878usdfs5p0sif
clr93as0q000u8usd0pn2azep	clr93bjaw00878usdfs5p0sif
clr93auy8002s8usd0i6b08bd	clr93bjaw00878usdfs5p0sif
clr93ar76000a8usd112t7eh4	clr93bjhy00888usda3xb6vzt
clr93aqyj00048usd1jkt4uzn	clr93bjhy00888usda3xb6vzt
clr93arlo000k8usd6bbs3bg6	clr93bjhy00888usda3xb6vzt
clr93auzn002t8usd92eb2nht	clr93bjp600898usda4zw68rg
clr93at5f001m8usd5f69dy1x	clr93bjwt008a8usd0amn09hh
clr93atz700258usd3vou0f9e	clr93bjwt008a8usd0amn09hh
clr93ara4000c8usd8zbk4y9m	clr93bk3z008b8usdeiz10tez
clr93arbi000d8usdddu6as85	clr93bk3z008b8usdeiz10tez
clr93ara4000c8usd8zbk4y9m	clr93bkba008c8usdful65vxi
clr93arbi000d8usdddu6as85	clr93bkba008c8usdful65vxi
clr93aqyj00048usd1jkt4uzn	clr93bkix008d8usdf57qfaf8
clr93asxx001h8usdd76ygogf	clr93bkix008d8usdf57qfaf8
clr93asze001i8usdedbe8gds	clr93bkix008d8usdf57qfaf8
clr93asmb00198usd5eco26qh	clr93bkqc008e8usd1hprdzla
clr93arxu000s8usdf1382h3y	clr93bkqc008e8usd1hprdzla
clr93arn6000l8usdf6stcz35	clr93bkxk008f8usd5a1q3qh3
clr93aud6002e8usd583h93uy	clr93bkxk008f8usd5a1q3qh3
clr93av14002u8usd8p67gffn	clr93bkxk008f8usd5a1q3qh3
clr93arcy000e8usd6zj62zpu	clr93bl4g008g8usddiy619xv
clr93atiy001v8usdhfba76gn	clr93bl4g008g8usddiy619xv
clr93aqwy00038usd1zqx0nhm	clr93blbl008h8usdgh6f06nn
clr93aung002l8usde3reb9x3	clr93blbl008h8usdgh6f06nn
clr93av2q002v8usd5gy86w9e	clr93blio008i8usdcy2n9wmh
clr93atoc001y8usd3uea1tov	clr93blio008i8usdcy2n9wmh
clr93av4f002w8usd1kmr9eif	clr93blio008i8usdcy2n9wmh
clr93ar8m000b8usd20knbmac	clr93blpm008j8usdeaxp4v2d
clr93av5w002x8usd9dqbd46c	clr93blwr008k8usdbw3r8p3n
clr93au0m00268usddfhdfox5	clr93bm3w008l8usd6ic5936o
clr93ar76000a8usd112t7eh4	clr93bmbf008m8usd3mrb7jtm
clr93ar8m000b8usd20knbmac	clr93bmbf008m8usd3mrb7jtm
clr93av7a002y8usd246092bp	clr93bmiq008n8usd9tnfgrd4
clr93aruu000q8usde7wbe8rc	clr93bmiq008n8usd9tnfgrd4
clr93arhd000h8usd9gxd2kii	clr93bmpr008o8usd181c2l5d
clr93ar8m000b8usd20knbmac	clr93bmpr008o8usd181c2l5d
clr93av8x002z8usd9igpa6xk	clr93bmpr008o8usd181c2l5d
clr93at8k001o8usdgi8h8omt	clr93bmwz008p8usdg7ol601e
clr93auzn002t8usd92eb2nht	clr93bmwz008p8usdg7ol601e
clr93au0m00268usddfhdfox5	clr93bn3z008q8usd95vo4zgw
clr93avae00308usd0ye75ysc	clr93bn3z008q8usd95vo4zgw
clr93asdo00138usdb0tfg0d5	clr93bnat008r8usdbq0cbgcq
clr93atd1001r8usd8gli9ulx	clr93bnat008r8usdbq0cbgcq
clr93arxu000s8usdf1382h3y	clr93bnat008r8usdbq0cbgcq
clr93ar76000a8usd112t7eh4	clr93bnhw008s8usd0qy184bz
clr93aqyj00048usd1jkt4uzn	clr93bnhw008s8usd0qy184bz
clr93avbu00318usd5w246wzh	clr93bnhw008s8usd0qy184bz
clr93arhd000h8usd9gxd2kii	clr93bnp4008t8usd65mqh41v
clr93avda00328usd6h72chuy	clr93bnp4008t8usd65mqh41v
clr93arot000m8usd4kdw6nm5	clr93bnw4008u8usd0ucs4ez2
clr93aqyj00048usd1jkt4uzn	clr93bnw4008u8usd0ucs4ez2
clr93avez00338usd13gje0d9	clr93bnw4008u8usd0ucs4ez2
clr93arcy000e8usd6zj62zpu	clr93bo3k008v8usd06zdcn41
clr93atiy001v8usdhfba76gn	clr93bo3k008v8usd06zdcn41
clr93arn6000l8usdf6stcz35	clr93boad008w8usd7w8c8gxb
clr93as9c00108usdd74rgvit	clr93boad008w8usd7w8c8gxb
clr93asnt001a8usdbi250bt0	clr93bohl008x8usd4wuu8rds
clr93as54000x8usd0cpobgw6	clr93bohl008x8usd4wuu8rds
clr93asp7001b8usdd4lw73hp	clr93bohl008x8usd4wuu8rds
clr93avgc00348usdesp736dz	clr93booz008y8usdemrg31m2
clr93arxu000s8usdf1382h3y	clr93bovw008z8usdcdrh4z1s
clr93arcy000e8usd6zj62zpu	clr93bp3a00908usdcmg1bsvy
clr93av4f002w8usd1kmr9eif	clr93bp3a00908usdcmg1bsvy
clr93atiy001v8usdhfba76gn	clr93bp3a00908usdcmg1bsvy
clr93av5w002x8usd9dqbd46c	clr93bpai00918usda29v6rrh
clr93auws002r8usdehl43gwe	clr93bpai00918usda29v6rrh
clr93arn6000l8usdf6stcz35	clr93bphm00928usde8n5bpql
clr93arrw000o8usd6h260vw4	clr93bphm00928usde8n5bpql
clr93ass6001d8usd9c8h5j0w	clr93bphm00928usde8n5bpql
clr93ar76000a8usd112t7eh4	clr93bpq300938usdckgd2osg
clr93aqyj00048usd1jkt4uzn	clr93bpq300938usdckgd2osg
clr93artd000p8usd5dyraemf	clr93bpq300938usdckgd2osg
clr93arhd000h8usd9gxd2kii	clr93bpxn00948usd715d20ey
clr93atz700258usd3vou0f9e	clr93bpxn00948usd715d20ey
clr93ar1j00068usdhyx3cjel	clr93bq4q00958usdck1i0ta4
clr93ar8m000b8usd20knbmac	clr93bqbs00968usd1s1q7unl
clr93avhu00358usdgw7r3dwm	clr93bqj700978usddrbk8y0q
clr93athh001u8usd80c7f5ry	clr93bqj700978usddrbk8y0q
clr93arlo000k8usd6bbs3bg6	clr93bqqe00988usd7drcer77
clr93aukf002j8usdf5kw9gko	clr93bqqe00988usd7drcer77
clr93avhu00358usdgw7r3dwm	clr93bqxk00998usda2jqb94j
clr93ar8m000b8usd20knbmac	clr93br4q009a8usdd1015blt
clr93arot000m8usd4kdw6nm5	clr93brbq009b8usdfny70pp9
clr93artd000p8usd5dyraemf	clr93brbq009b8usdfny70pp9
clr93avj900368usd5bozhp2l	clr93brbq009b8usdfny70pp9
clr93avkq00378usdajho376e	clr93brin009c8usd9f1kdb42
clr93avmm00388usd3ww6aqyn	clr93brin009c8usd9f1kdb42
clr93arbi000d8usdddu6as85	clr93brpz009d8usd0grccolx
clr93avo300398usd21pzhmjp	clr93brpz009d8usd0grccolx
clr93as26000v8usdhw8s6lfr	clr93brpz009d8usd0grccolx
clr93as54000x8usd0cpobgw6	clr93brwz009e8usdaewsc22w
clr93asjm00178usd5x28b5sl	clr93brwz009e8usdaewsc22w
clr93atoc001y8usd3uea1tov	clr93bs4g009f8usdhranbtzn
clr93asnt001a8usdbi250bt0	clr93bsbk009g8usdfpz3fa1c
clr93asp7001b8usdd4lw73hp	clr93bsbk009g8usdfpz3fa1c
clr93arn6000l8usdf6stcz35	clr93bsin009h8usd4s9u5khf
clr93arot000m8usd4kdw6nm5	clr93bsin009h8usd4s9u5khf
clr93arrw000o8usd6h260vw4	clr93bsin009h8usd4s9u5khf
clr93avhu00358usdgw7r3dwm	clr93bspo009i8usd0y9c9k2s
clr93avpi003a8usd2i1wgwjs	clr93bspo009i8usd0y9c9k2s
clr93athh001u8usd80c7f5ry	clr93bspo009i8usd0y9c9k2s
clr93arlo000k8usd6bbs3bg6	clr93bswv009j8usd28w1dvp0
clr93ar8m000b8usd20knbmac	clr93bswv009j8usd28w1dvp0
clr93ar76000a8usd112t7eh4	clr93bt46009k8usd0mhq3gdu
clr93aqyj00048usd1jkt4uzn	clr93bt46009k8usd0mhq3gdu
clr93avez00338usd13gje0d9	clr93bt46009k8usd0mhq3gdu
clr93at5f001m8usd5f69dy1x	clr93btbh009l8usd8jqw5w08
clr93avr3003b8usd0v2r82f2	clr93btbh009l8usd8jqw5w08
clr93aug8002g8usd0mcgg5l7	clr93btin009m8usd8qw4e6ee
clr93aqwy00038usd1zqx0nhm	clr93btin009m8usd8qw4e6ee
clr93asnt001a8usdbi250bt0	clr93btpt009n8usd7phr7acx
clr93asp7001b8usdd4lw73hp	clr93btpt009n8usd7phr7acx
clr93au5q00298usdfoqd5r2c	clr93btwu009o8usd470mhqil
clr93aung002l8usde3reb9x3	clr93btwu009o8usd470mhqil
clr93asgv00158usdaufc2ee8	clr93bu4g009p8usdc60110np
clr93av2q002v8usd5gy86w9e	clr93bubi009q8usd9xc1fos3
clr93asmb00198usd5eco26qh	clr93buiz009r8usd6uy00tza
clr93arxu000s8usdf1382h3y	clr93buiz009r8usd6uy00tza
clr93avsu003c8usd5uuydpzw	clr93buiz009r8usd6uy00tza
clr93au4600288usd9a8qgujl	clr93buq3009s8usd5hbyejw0
clr93arn6000l8usdf6stcz35	clr93bux8009t8usd23gi0sis
clr93arot000m8usd4kdw6nm5	clr93bux8009t8usd23gi0sis
clr93aqyj00048usd1jkt4uzn	clr93bux8009t8usd23gi0sis
clr93au78002a8usd00lv1wb2	clr93bv4k009u8usd1m9yfbpk
clr93arbi000d8usdddu6as85	clr93bvbr009v8usd9z14007l
clr93ar5u00098usdg4fs5v3d	clr93bvbr009v8usd9z14007l
clr93as26000v8usdhw8s6lfr	clr93bvbr009v8usd9z14007l
clr93arfy000g8usd43arfplb	clr93bvj9009w8usdgvz823om
clr93avo300398usd21pzhmjp	clr93bvqi009x8usd116z2z9q
clr93arcy000e8usd6zj62zpu	clr93bvxh009y8usdhudre5gw
clr93arcy000e8usd6zj62zpu	clr93bw5a009z8usd0833fh40
clr93av4f002w8usd1kmr9eif	clr93bw5a009z8usd0833fh40
clr93atiy001v8usdhfba76gn	clr93bw5a009z8usd0833fh40
clr93avug003d8usdbsxx07lc	clr93bwcl00a08usd76upfbzn
clr93avw5003e8usdchqq4ej9	clr93bwjg00a18usd3t0r4qg6
clr93avxl003f8usdgx35fhtk	clr93bwjg00a18usd3t0r4qg6
clr93arcy000e8usd6zj62zpu	clr93bwqk00a28usd4z1j1uyn
clr93avz2003g8usd1endd46a	clr93bwqk00a28usd4z1j1uyn
clr93atiy001v8usdhfba76gn	clr93bwqk00a28usd4z1j1uyn
clr93av2q002v8usd5gy86w9e	clr93bwxz00a38usd1cbg6vqj
clr93atoc001y8usd3uea1tov	clr93bwxz00a38usd1cbg6vqj
clr93arn6000l8usdf6stcz35	clr93bx5300a48usd6z9m2wtv
clr93ar8m000b8usd20knbmac	clr93bx5300a48usd6z9m2wtv
clr93aqvg00028usd6a6ods95	clr93bxcc00a58usddnl7b30y
clr93asmb00198usd5eco26qh	clr93bxcc00a58usddnl7b30y
clr93at5f001m8usd5f69dy1x	clr93bxjk00a68usd47zd3cd0
clr93aw0j003h8usd4u315yjt	clr93bxjk00a68usd47zd3cd0
clr93aw1w003i8usd11dkdjuf	clr93bxjk00a68usd47zd3cd0
clr93arbi000d8usdddu6as85	clr93bxqm00a78usd7yn8b31f
clr93ar5u00098usdg4fs5v3d	clr93bxqm00a78usd7yn8b31f
clr93att500218usdcyobcsa9	clr93bxxm00a88usd462l5tq6
clr93aung002l8usde3reb9x3	clr93by5100a98usd753h0yia
clr93avmm00388usd3ww6aqyn	clr93bycb00aa8usdhetgc3dn
clr93at2c001k8usd4z1ocv8k	clr93bycb00aa8usdhetgc3dn
clr93aw3s003j8usd8l2l4d41	clr93bycb00aa8usdhetgc3dn
clr93arbi000d8usdddu6as85	clr93byjl00ab8usddwi7f16t
clr93avo300398usd21pzhmjp	clr93byjl00ab8usddwi7f16t
clr93as26000v8usdhw8s6lfr	clr93byjl00ab8usddwi7f16t
clr93arot000m8usd4kdw6nm5	clr93byqn00ac8usd6q9842vh
clr93auws002r8usdehl43gwe	clr93byqn00ac8usd6q9842vh
clr93ar8m000b8usd20knbmac	clr93byqn00ac8usd6q9842vh
clr93au78002a8usd00lv1wb2	clr93byy300ad8usdbsg47oko
clr93asdo00138usdb0tfg0d5	clr93byy300ad8usdbsg47oko
clr93asnt001a8usdbi250bt0	clr93byy300ad8usdbsg47oko
clr93aqwy00038usd1zqx0nhm	clr93bz5800ae8usd5txw7frv
clr93asxx001h8usdd76ygogf	clr93bzcp00af8usd3l1eefbs
clr93asze001i8usdedbe8gds	clr93bzcp00af8usd3l1eefbs
clr93arcy000e8usd6zj62zpu	clr93bzk800ag8usd4ziv6jz6
clr93aqsl00018usd82qnffvu	clr93bzrs00ah8usdbk27gfqe
clr93arxu000s8usdf1382h3y	clr93bzrs00ah8usdbk27gfqe
clr93asc600128usd0j3papsf	clr93bzrs00ah8usdbk27gfqe
clr93avhu00358usdgw7r3dwm	clr93bzyw00ai8usd9bnifzim
clr93avpi003a8usd2i1wgwjs	clr93bzyw00ai8usd9bnifzim
clr93athh001u8usd80c7f5ry	clr93bzyw00ai8usd9bnifzim
clr93aqwy00038usd1zqx0nhm	clr93c06000aj8usdccm23bsv
clr93auho002h8usd6iyu6d2f	clr93c06000aj8usdccm23bsv
clr93asia00168usd1mlwaz4s	clr93c0d500ak8usd18ai49dh
clr93aw58003k8usd9aze3kj2	clr93c0d500ak8usd18ai49dh
clr93asjm00178usd5x28b5sl	clr93c0d500ak8usd18ai49dh
clr93ar76000a8usd112t7eh4	clr93c0kp00al8usde8w73359
clr93ar8m000b8usd20knbmac	clr93c0kp00al8usde8w73359
clr93aw7c003l8usd964p0e06	clr93c0kp00al8usde8w73359
clr93as3m000w8usd6kvbex4r	clr93c0s000am8usdg50f7ayh
clr93as7y000z8usd1gmn7gso	clr93c0s000am8usdg50f7ayh
clr93aw8q003m8usda4019x1a	clr93c0s000am8usdg50f7ayh
clr93avae00308usd0ye75ysc	clr93c0z600an8usd8s4106zz
clr93asia00168usd1mlwaz4s	clr93c16400ao8usdesfs0w9q
clr93aung002l8usde3reb9x3	clr93c16400ao8usdesfs0w9q
clr93arcy000e8usd6zj62zpu	clr93c1f000ap8usdabuv7g7e
clr93arot000m8usd4kdw6nm5	clr93c1mb00aq8usd30xfdcw8
clr93aqyj00048usd1jkt4uzn	clr93c1mb00aq8usd30xfdcw8
clr93asp7001b8usdd4lw73hp	clr93c1tp00ar8usd5qrxhb62
clr93arxu000s8usdf1382h3y	clr93c1tp00ar8usd5qrxhb62
clr93arcy000e8usd6zj62zpu	clr93c20r00as8usdb9qnhms5
clr93au8p002b8usd58pjcgp4	clr93c20r00as8usdb9qnhms5
clr93ar76000a8usd112t7eh4	clr93c28b00at8usdd7ioc8cv
clr93au2200278usd555ncwpp	clr93c2ff00au8usddji1gyut
clr93atd1001r8usd8gli9ulx	clr93c2mv00av8usd6n95fitl
clr93asmb00198usd5eco26qh	clr93c2mv00av8usd6n95fitl
clr93asjm00178usd5x28b5sl	clr93c2mv00av8usd6n95fitl
clr93asdo00138usdb0tfg0d5	clr93c2u900aw8usd4acx82px
clr93att500218usdcyobcsa9	clr93c31g00ax8usdduvzaonj
clr93as9c00108usdd74rgvit	clr93c31g00ax8usdduvzaonj
clr93arcy000e8usd6zj62zpu	clr93c38k00ay8usd9b2he5yq
clr93awag003n8usd4zvvg59p	clr93c38k00ay8usd9b2he5yq
clr93atiy001v8usdhfba76gn	clr93c38k00ay8usd9b2he5yq
clr93arn6000l8usdf6stcz35	clr93c3fr00az8usd7om6cz2t
clr93arrw000o8usd6h260vw4	clr93c3fr00az8usd7om6cz2t
clr93atz700258usd3vou0f9e	clr93c3fr00az8usd7om6cz2t
clr93as3m000w8usd6kvbex4r	clr93c3mu00b08usdefiwdzdu
clr93as7y000z8usd1gmn7gso	clr93c3mu00b08usdefiwdzdu
clr93as54000x8usd0cpobgw6	clr93c3mu00b08usdefiwdzdu
clr93arcy000e8usd6zj62zpu	clr93c3u700b18usd1ma1eccm
clr93av4f002w8usd1kmr9eif	clr93c3u700b18usd1ma1eccm
clr93atiy001v8usdhfba76gn	clr93c3u700b18usd1ma1eccm
clr93awcl003o8usdb1622uvu	clr93c41j00b28usd6j2ahv6a
clr93arn6000l8usdf6stcz35	clr93c48l00b38usd55va4s0j
clr93arhd000h8usd9gxd2kii	clr93c48l00b38usd55va4s0j
clr93ar8m000b8usd20knbmac	clr93c48l00b38usd55va4s0j
clr93arxu000s8usdf1382h3y	clr93c4fx00b48usdbx9v3df7
clr93arbi000d8usdddu6as85	clr93c4n600b58usdc19reb15
clr93awet003p8usdc6w4fsqw	clr93c4n600b58usdc19reb15
clr93av2q002v8usd5gy86w9e	clr93c4um00b68usde55u9vxh
clr93atoc001y8usd3uea1tov	clr93c4um00b68usde55u9vxh
clr93arn6000l8usdf6stcz35	clr93c52n00b78usdgqebee36
clr93arrw000o8usd6h260vw4	clr93c52n00b78usdgqebee36
clr93avmm00388usd3ww6aqyn	clr93c59x00b88usddcclhowj
clr93at2c001k8usd4z1ocv8k	clr93c59x00b88usddcclhowj
clr93aw3s003j8usd8l2l4d41	clr93c59x00b88usddcclhowj
clr93aqsl00018usd82qnffvu	clr93c5h400b98usd3bfmcsju
clr93aud6002e8usd583h93uy	clr93c5oe00ba8usd5ak42uqx
clr93atw500238usdcmshe67v	clr93c5oe00ba8usd5ak42uqx
clr93as26000v8usdhw8s6lfr	clr93c5oe00ba8usd5ak42uqx
clr93arhd000h8usd9gxd2kii	clr93c5ve00bb8usdgrvvaaa1
clr93auws002r8usdehl43gwe	clr93c5ve00bb8usdgrvvaaa1
clr93ar8m000b8usd20knbmac	clr93c5ve00bb8usdgrvvaaa1
clr93asdo00138usdb0tfg0d5	clr93c62l00bc8usdaip7d9g1
clr93asnt001a8usdbi250bt0	clr93c62l00bc8usdaip7d9g1
clr93aud6002e8usd583h93uy	clr93c69t00bd8usd8xaqgeyb
clr93arbi000d8usdddu6as85	clr93c69t00bd8usd8xaqgeyb
clr93as26000v8usdhw8s6lfr	clr93c69t00bd8usd8xaqgeyb
clr93atg4001t8usd33mu6uxp	clr93c6h600be8usd4hfcf54a
clr93atg4001t8usd33mu6uxp	clr93c6oa00bf8usd4hwh5s4i
clr93aqyj00048usd1jkt4uzn	clr93c6vn00bg8usd60nw8iqo
clr93avez00338usd13gje0d9	clr93c6vn00bg8usd60nw8iqo
clr93aw58003k8usd9aze3kj2	clr93c6vn00bg8usd60nw8iqo
clr93ar76000a8usd112t7eh4	clr93c72t00bh8usd8vpg18gf
clr93ar8m000b8usd20knbmac	clr93c72t00bh8usd8vpg18gf
clr93at0v001j8usd50tggy8u	clr93c7a300bi8usdck6pbme2
clr93avo300398usd21pzhmjp	clr93c7a300bi8usdck6pbme2
clr93as26000v8usdhw8s6lfr	clr93c7a300bi8usdck6pbme2
clr93arhd000h8usd9gxd2kii	clr93c7gy00bj8usdgcuh8pac
clr93ar8m000b8usd20knbmac	clr93c7gy00bj8usdgcuh8pac
clr93asdo00138usdb0tfg0d5	clr93c7o800bk8usdhmb1cvgv
clr93atd1001r8usd8gli9ulx	clr93c7o800bk8usdhmb1cvgv
clr93av5w002x8usd9dqbd46c	clr93c7va00bl8usd2hvo79n7
clr93aw7c003l8usd964p0e06	clr93c7va00bl8usd2hvo79n7
clr93ar0000058usd9iyic37j	clr93c7va00bl8usd2hvo79n7
clr93au5q00298usdfoqd5r2c	clr93c82l00bm8usdd4dse242
clr93ass6001d8usd9c8h5j0w	clr93c82l00bm8usdd4dse242
clr93arcy000e8usd6zj62zpu	clr93c89x00bn8usdc8hs9y9m
clr93arbi000d8usdddu6as85	clr93c89x00bn8usdc8hs9y9m
clr93aung002l8usde3reb9x3	clr93c8gy00bo8usdamk5htt8
clr93awgq003q8usd8ylndcer	clr93c8gy00bo8usdamk5htt8
clr93auho002h8usd6iyu6d2f	clr93c8gy00bo8usdamk5htt8
clr93aus0002o8usddz360ryi	clr93c8ob00bp8usdfwj2cwh4
clr93awis003r8usd7pp2gpsj	clr93c8ob00bp8usdfwj2cwh4
clr93at5f001m8usd5f69dy1x	clr93c8vc00bq8usdcqry3914
clr93arhd000h8usd9gxd2kii	clr93c8vc00bq8usdcqry3914
clr93ar8m000b8usd20knbmac	clr93c8vc00bq8usdcqry3914
clr93asxx001h8usdd76ygogf	clr93c93600br8usd0xdr5q4y
clr93asze001i8usdedbe8gds	clr93c93600br8usd0xdr5q4y
clr93arn6000l8usdf6stcz35	clr93c9a800bs8usdfd71ewr1
clr93ar76000a8usd112t7eh4	clr93c9a800bs8usdfd71ewr1
clr93arhd000h8usd9gxd2kii	clr93c9hk00bt8usd7vy32rtx
clr93ar8m000b8usd20knbmac	clr93c9hk00bt8usd7vy32rtx
clr93atoc001y8usd3uea1tov	clr93c9hk00bt8usd7vy32rtx
clr93arhd000h8usd9gxd2kii	clr93c9p200bu8usd3rs5huv0
clr93ariu000i8usd09muglbr	clr93c9p200bu8usd3rs5huv0
clr93arn6000l8usdf6stcz35	clr93c9wf00bv8usd26oo4yx1
clr93arot000m8usd4kdw6nm5	clr93c9wf00bv8usd26oo4yx1
clr93artd000p8usd5dyraemf	clr93c9wf00bv8usd26oo4yx1
clr93aung002l8usde3reb9x3	clr93ca3l00bw8usddoxjc2aw
clr93auho002h8usd6iyu6d2f	clr93ca3l00bw8usddoxjc2aw
clr93au4600288usd9a8qgujl	clr93caav00bx8usd12u5d5w5
clr93atd1001r8usd8gli9ulx	clr93cai800by8usd47nldt79
clr93aung002l8usde3reb9x3	clr93cai800by8usd47nldt79
clr93asjm00178usd5x28b5sl	clr93cai800by8usd47nldt79
clr93atz700258usd3vou0f9e	clr93capc00bz8usdcsnl7hd4
clr93awkq003s8usda7khbq82	clr93cawk00c08usd1etoeop0
clr93awmt003t8usdf9ay492a	clr93cawk00c08usd1etoeop0
clr93arqi000n8usdgei6b46p	clr93cawk00c08usd1etoeop0
clr93ar76000a8usd112t7eh4	clr93cb3t00c18usd2r9uciw3
clr93arlo000k8usd6bbs3bg6	clr93cb3t00c18usd2r9uciw3
clr93ar8m000b8usd20knbmac	clr93cb3t00c18usd2r9uciw3
clr93avo300398usd21pzhmjp	clr93cbb000c28usd3mqndale
clr93as26000v8usdhw8s6lfr	clr93cbb000c28usd3mqndale
clr93auep002f8usdgiec3q71	clr93cbb000c28usd3mqndale
clr93at5f001m8usd5f69dy1x	clr93cbib00c38usd5x4h8gn9
clr93awp5003u8usdhiqie3lj	clr93cbib00c38usd5x4h8gn9
clr93atz700258usd3vou0f9e	clr93cbib00c38usd5x4h8gn9
clr93asmb00198usd5eco26qh	clr93cbpp00c48usd84f3epzl
clr93arxu000s8usdf1382h3y	clr93cbpp00c48usd84f3epzl
clr93asnt001a8usdbi250bt0	clr93cbwq00c58usd1plhgfk8
clr93asjm00178usd5x28b5sl	clr93cbwq00c58usd1plhgfk8
test1	test1
test2	test2
test3	test3
test4	test4
test5	test5
\.


--
-- Data for Name: documents; Type: TABLE DATA; Schema: public; Owner: asseradmin
--

COPY public.documents (id, application_id, link) FROM stdin;
\.


--
-- Data for Name: educational_backgrounds; Type: TABLE DATA; Schema: public; Owner: asseradmin
--

COPY public.educational_backgrounds (id, application_id, "institutionName", "graduationYear", highest_qualification) FROM stdin;
\.


--
-- Data for Name: likes; Type: TABLE DATA; Schema: public; Owner: asseradmin
--

COPY public.likes (id, post_id, author_id) FROM stdin;
\.


--
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: asseradmin
--

COPY public.notifications (id, content, "createdAt", "readAt", status, user_id) FROM stdin;
\.


--
-- Data for Name: personal_infos; Type: TABLE DATA; Schema: public; Owner: asseradmin
--

COPY public.personal_infos (id, application_id, "firstName", "lastName", email, "phoneNumber", "dateOfBirth", nationality, "languageProficiency", "nativeLanguage") FROM stdin;
\.


--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: asseradmin
--

COPY public.posts (id, title, content, "createdAt", author_id) FROM stdin;
clr93fzyj000111warl5jrnrd	Test Post 1	This is the content for test post 1.	2024-01-11 10:55:49.963	test1
clr93g078000911wap22wuho1	Test Post 2	This is the content for test post 2.	2024-01-11 10:55:50.276	test2
clr93g0dj000h11waaf5gd9wg	Test Post 3	This is the content for test post 3.	2024-01-11 10:55:50.503	test3
clr93g0jj000p11wacffeis8x	Test Post 4	This is the content for test post 4.	2024-01-11 10:55:50.72	test4
clr93g0pg000x11wapkkc9whm	Test Post 5	This is the content for test post 5.	2024-01-11 10:55:50.932	test5
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: asseradmin
--

COPY public.sessions (id, user_id, session_token, access_token, expires, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: study_programs; Type: TABLE DATA; Schema: public; Owner: asseradmin
--

COPY public.study_programs (id, name, description, "startDate", "degreeType", attendance, payment_cycle, study_program_link, university_id, tuition_fee, "IELTS_score", "TOEFL_score", duration, apply_date, study_program_language, format) FROM stdin;
clr93az3y005f8usdav22gtqm	chemistry	the chemistry course at university of wroclaw will let you obtain extensive knowledge of chemistry. thanks to lectures and laboratory classes, you will have the opportunity to gain vast knowledge of modern methods of chemical synthesis.	oct 2024	b.sc.	on campus	year	https://sl.prtl.co/track/click/?target=https%3a%2f%2finternational.uni.wroc.pl%2fen%2fadmission-full-degree-studies%2fprogrammes-english%2fchemistry-7&facts=eyjsijp7inqioijzdhvkesisimkioiixmtq2otkilcjkijoiq2hlbwlzdhj5iiwibci6inbyzw1pdw0ifswicyi6bnvsbcwidsi6eyjpijoinjiumjqxljuwljq0iiwicyi6ijjiyzrhntljlwq3ywutndvkzi05mge3lwm3otm1mwmwmda0ncisimwioijlbi1hqiisimmioijkzsisimeioijnb3ppbgxhlzuumcaov2luzg93cybovcaxmc4woybxaw42ndsgedy0ksbbchbszvdlyktpdc81mzcumzygketive1mlcbsawtliedly2tvksbdahjvbwuvmte3ljaumc4wifnhzmfyas81mzcumzyifswizii6w3siysi6imnsawmilcj0ijoibgluayisimkioiixota0mjuziiwizci6imh0dhbzoi8vaw50zxjuyxrpb25hbc51bmkud3jvyy5wbc9lbi9hzg1pc3npb24tznvsbc1kzwdyzwutc3r1zgllcy9wcm9ncmftbwvzlwvuz2xpc2gvy2hlbwlzdhj5ltcilcjsijoicmv2zw51zsisimv4ijp7inb0ijoiccj9fv19&taps=null	clr93awqm003v8usd90vacpjl	2200	6	72	3	aug 2024	EN	{Full-time}
clr93azfj005g8usdgfkzf470	management	the company means people, infrastructure, financial and material resources. it takes knowledge and imagination to manage it all. at vistula university in warsaw, we educate people who want to take responsibility for the company. studies in the field of management will allow you to become a successful leader.	feb 2024	b.a.	on campus	year	https://sl.prtl.co/track/click/?target=https%3a%2f%2fstudyatvistula.com%2fprogrammes%2fbachelor-programmes%2fba-in-management%2f%3fmicrosite%3dtrue&facts=eyjsijp7inqioijzdhvkesisimkioiiznzq3njyilcjkijoitwfuywdlbwvudcisimwioijwcmvtaxvtin0sinmiom51bgwsinuionsiasi6ijyylji0ms41mc40ncisinmioiiyymm0ytu5yy1kn2flltq1zgytotbhny1jnzkzntfjmdawndqilcjsijoizw4tr0iilcjjijoizguilcjhijoitw96awxsys81ljagkfdpbmrvd3mgtlqgmtaumdsgv2lunjq7ihg2nckgqxbwbgvxzwjlaxqvntm3ljm2ichlsfrntcwgbglrzsbhzwnrbykgq2hyb21llzexny4wljaumcbtywzhcmkvntm3ljm2in0simyiolt7imeioijjbgljiiwidci6imxpbmsilcjpijoimji0ntq3osisimqioijodhrwczovl3n0dwr5yxr2axn0dwxhlmnvbs9wcm9ncmftbwvzl2jhy2hlbg9ylxbyb2dyyw1tzxmvymetaw4tbwfuywdlbwvudc8%2fbwljcm9zaxrlpxrydwuilcjsijoicmv2zw51zsisimv4ijp7inb0ijoiccj9fv19&taps=null	clr93awtf003w8usd6nuw9zz0	2700	\N	87	3	jan 2024	PL	{Full-time,Part-time}
clr93azml005h8usd9bam509b	journalism and social communication	now is a good time to study journalism at vistula university. interesting and professional journalism is always in demand, and maintaining its quality is one of the most important challenges of the future for this profession. new tools and channels for content delivery allow journalism and social communication to play a fundamental role in the modern world.	oct 2024	b.a.	on campus	year	https://sl.prtl.co/track/click/?target=https%3a%2f%2fstudyatvistula.com%2fprogrammes%2fbachelor-programmes%2fba-in-journalism-and-social-communication%2f%3fmicrosite%3dtrue&facts=eyjsijp7inqioijzdhvkesisimkioiiznzq3njuilcjkijoism91cm5hbglzbsbhbmqgu29jawfsienvbw11bmljyxrpb24ilcjsijoichjlbwl1bsj9lcjzijpudwxslcj1ijp7imkioii2mi4yndeuntaundqilcjzijoimmjjnge1owmtzddhzs00nwrmltkwytctyzc5mzuxyzawmdq0iiwibci6imvuludciiwiyyi6imrliiwiysi6ik1vemlsbgevns4wichxaw5kb3dzie5uidewlja7ifdpbjy0oyb4njqpiefwcgxlv2vis2l0lzuzny4zniaos0hutuwsigxpa2ugr2vja28pienocm9tzs8xmtcumc4wljagu2fmyxjplzuzny4znij9lcjmijpbeyjhijoiy2xpyyisinqioijsaw5riiwiasi6ijiyndu0nzgilcjkijoiahr0chm6ly9zdhvkewf0dmlzdhvsys5jb20vchjvz3jhbw1lcy9iywnozwxvci1wcm9ncmftbwvzl2jhlwlulwpvdxjuywxpc20tyw5klxnvy2lhbc1jb21tdw5py2f0aw9ulz9tawnyb3npdgu9dhj1zsisimwioijyzxzlbnvliiwizxgionsichqioijwin19xx0%3d&taps=null	clr93awtf003w8usd6nuw9zz0	2500	\N	87	3	unknown	PL	{Full-time}
clr93aztv005i8usdaaru42u9	dentistry	the dentistry program from medical university of lodz is designed for high school or secondary school graduates. program is based on requirements obligatory for the polish medical higher education institutions and is adequate to eu standards.	oct 2024	bachelor	on campus	year	https://sl.prtl.co/track/click/?target=https%3a%2f%2fstudymed.umed.pl%2fadmission%2f5-year-dmd-dentistry%2fabout-5-dmd-program%2f&facts=eyjsijp7inqioijzdhvkesisimkioiiyody5odailcjkijoirgvudglzdhj5iiwibci6inbyzw1pdw0ifswicyi6bnvsbcwidsi6eyjpijoinjiumjqxljuwljq0iiwicyi6ijjiyzrhntljlwq3ywutndvkzi05mge3lwm3otm1mwmwmda0ncisimwioijlbi1hqiisimmioijkzsisimeioijnb3ppbgxhlzuumcaov2luzg93cybovcaxmc4woybxaw42ndsgedy0ksbbchbszvdlyktpdc81mzcumzygketive1mlcbsawtliedly2tvksbdahjvbwuvmte3ljaumc4wifnhzmfyas81mzcumzyifswizii6w3siysi6imnsawmilcj0ijoibgluayisimkioiiymtqynde0iiwizci6imh0dhbzoi8vc3r1zhltzwqudw1lzc5wbc9hzg1pc3npb24vns15zwfylwrtzc1kzw50axn0cnkvywjvdxqtns1kbwqtchjvz3jhbs8ilcjsijoicmv2zw51zsisimv4ijp7inb0ijoiccj9fv19&taps=null	clr93awuw003x8usd0g4z85dz	13200	6	75	5	aug 2024	EN	{Full-time}
clr93b00u005j8usd8vp98c6h	management	the management bsc programme from escp business school allows students to become experts in management science and learn how to make complex decisions. while exploring humanities, they practice how to deal with people and lead teams.	sep 2024	b.sc.	on campus	year	https://sl.prtl.co/track/click/?target=https%3a%2f%2fbusiness-school-international.escpeurope.eu%2fen%2fundergraduate%2fbachelor-in-management-bsc%2findex.php%3fchannel%3d1406%26event%3d2242%26campaign%3d&facts=eyjsijp7inqioijzdhvkesisimkioii3mda4ocisimqioijnyw5hz2vtzw50iiwibci6inbyzw1pdw0ifswicyi6bnvsbcwidsi6eyjpijoinjiumjqxljuwljq0iiwicyi6ijjiyzrhntljlwq3ywutndvkzi05mge3lwm3otm1mwmwmda0ncisimwioijlbi1hqiisimmioijkzsisimeioijnb3ppbgxhlzuumcaov2luzg93cybovcaxmc4woybxaw42ndsgedy0ksbbchbszvdlyktpdc81mzcumzygketive1mlcbsawtliedly2tvksbdahjvbwuvmte3ljaumc4wifnhzmfyas81mzcumzyifswizii6w3siysi6imnsawmilcj0ijoibgluayisimkioiixotyznzgxiiwizci6imh0dhbzoi8vynvzaw5lc3mtc2nob29slwludgvybmf0aw9uywwuzxnjcgv1cm9wzs5lds9lbi91bmrlcmdyywr1yxrll2jhy2hlbg9ylwlulw1hbmfnzw1lbnqtynnjl2luzgv4lnbocd9jagfubmvspte0mdymzxzlbnq9mji0mizjyw1wywlnbj0ilcjsijoicmv2zw51zsisimv4ijp7inb0ijoiccj9fv19&taps=null	clr93awwf003y8usd8laj7pp8	16920	6.5	90	3	unknown	PL	{Full-time}
clr93b07x005k8usd9we34w8c	medicine	the medicine program from medical university of lodz is designed for high school or secondary school graduates. it is a full time study program based on requirements obligatory for the polish medical higher education institutions and is adequate to eu standards.	oct 2024	bachelor	on campus	year	https://sl.prtl.co/track/click/?target=https%3a%2f%2fstudymed.umed.pl%2fadmission%2f6-year-md-medicine%2fabout-6-md-program%2f&facts=eyjsijp7inqioijzdhvkesisimkioiiyody5nziilcjkijoitwvkawnpbmuilcjsijoichjlbwl1bsj9lcjzijpudwxslcj1ijp7imkioii2mi4yndeuntaundqilcjzijoimmjjnge1owmtzddhzs00nwrmltkwytctyzc5mzuxyzawmdq0iiwibci6imvuludciiwiyyi6imrliiwiysi6ik1vemlsbgevns4wichxaw5kb3dzie5uidewlja7ifdpbjy0oyb4njqpiefwcgxlv2vis2l0lzuzny4zniaos0hutuwsigxpa2ugr2vja28pienocm9tzs8xmtcumc4wljagu2fmyxjplzuzny4znij9lcjmijpbeyjhijoiy2xpyyisinqioijsaw5riiwiasi6ijixndi0mdiilcjkijoiahr0chm6ly9zdhvkew1lzc51bwvklnbsl2fkbwlzc2lvbi82lxllyxitbwqtbwvkawnpbmuvywjvdxqtni1tzc1wcm9ncmftlyisimwioijyzxzlbnvliiwizxgionsichqioijwin19xx0%3d&taps=null	clr93awuw003x8usd0g4z85dz	12800	6	75	6	aug 2024	EN	{Full-time}
clr93b0fc005l8usda40298zr	english studies	vistula university offers english studies with an extended program of teaching a second foreign language, because in the times of globalization, cultural awareness and command of foreign languages have become key skills.	oct 2024	b.a.	on campus	year	https://sl.prtl.co/track/click/?target=https%3a%2f%2fstudyatvistula.com%2fprogrammes%2fbachelor-programmes%2fba-in-english-studies%2f%3fmicrosite%3dtrue&facts=eyjsijp7inqioijzdhvkesisimkioiiznzq3njeilcjkijoirw5nbglzacbtdhvkawvziiwibci6inbyzw1pdw0ifswicyi6bnvsbcwidsi6eyjpijoinjiumjqxljuwljq0iiwicyi6ijjiyzrhntljlwq3ywutndvkzi05mge3lwm3otm1mwmwmda0ncisimwioijlbi1hqiisimmioijkzsisimeioijnb3ppbgxhlzuumcaov2luzg93cybovcaxmc4woybxaw42ndsgedy0ksbbchbszvdlyktpdc81mzcumzygketive1mlcbsawtliedly2tvksbdahjvbwuvmte3ljaumc4wifnhzmfyas81mzcumzyifswizii6w3siysi6imnsawmilcj0ijoibgluayisimkioiiymjq1ndc0iiwizci6imh0dhbzoi8vc3r1zhlhdhzpc3r1bgeuy29tl3byb2dyyw1tzxmvymfjagvsb3itchjvz3jhbw1lcy9iys1pbi1lbmdsaxnolxn0dwrpzxmvp21py3jvc2l0zt10cnvliiwibci6injldmvudwuilcjleci6eyjwdci6inaifx1dfq%3d%3d&taps=null	clr93awtf003w8usd6nuw9zz0	1750	\N	87	3	unknown	EN	{Full-time,Part-time}
clr93b0mp005m8usd2fuo6u85	business management and leadership (hons)	the business management and leadership (hons) programme from coventry university  is designed to help you establish key leadership skills, from managing people and resources to strategic planning.	nov 2023	b.a.	on campus	year	https://sl.prtl.co/track/click/?target=https%3a%2f%2fstudyatcoventry.com%2fprogramme%2fcoventry-university-wroclaw%2f%3fmicrosite%3dtrue&facts=eyjsijp7inqioijzdhvkesisimkioiizmti1mjiilcjkijoiqnvzaw5lc3mgtwfuywdlbwvudcbhbmqgtgvhzgvyc2hpccaosg9ucykilcjsijoichjlbwl1bsj9lcjzijpudwxslcj1ijp7imkioii2mi4yndeuntaundqilcjzijoimmjjnge1owmtzddhzs00nwrmltkwytctyzc5mzuxyzawmdq0iiwibci6imvuludciiwiyyi6imrliiwiysi6ik1vemlsbgevns4wichxaw5kb3dzie5uidewlja7ifdpbjy0oyb4njqpiefwcgxlv2vis2l0lzuzny4zniaos0hutuwsigxpa2ugr2vja28pienocm9tzs8xmtcumc4wljagu2fmyxjplzuzny4znij9lcjmijpbeyjhijoiy2xpyyisinqioijsaw5riiwiasi6ijixnza3ndyilcjkijoiahr0chm6ly9zdhvkewf0y292zw50cnkuy29tl3byb2dyyw1tzs9jb3zlbnryes11bml2zxjzaxr5lxdyb2nsyxcvp21py3jvc2l0zt10cnvliiwibci6injldmvudwuilcjleci6eyjwdci6inaifx1dfq%3d%3d&taps=null	clr93awxx003z8usd6h88b7o9	5955	6	\N	3	unknown	EN	{Full-time}
clr93b0tx005n8usdgfb40wkt	international relations - global studies	the international relations - global studies programme from university of wroclaw is directed to all international and polish prospective students who would like to understand the mechanisms of globalization, and dependences between the local and global events and phenomena.	oct 2024	b.sc.	on campus	year	https://sl.prtl.co/track/click/?target=https%3a%2f%2finternational.uni.wroc.pl%2fen%2fadmission-full-degree-studies%2fprogrammes-english%2finternational-relations-global-studies-bachelor&facts=eyjsijp7inqioijzdhvkesisimkioiiymjq4njgilcjkijoisw50zxjuyxrpb25hbcbszwxhdglvbnmglsbhbg9iywwgu3r1zgllcyisimwioijwcmvtaxvtin0sinmiom51bgwsinuionsiasi6ijyylji0ms41mc40ncisinmioiiyymm0ytu5yy1kn2flltq1zgytotbhny1jnzkzntfjmdawndqilcjsijoizw4tr0iilcjjijoizguilcjhijoitw96awxsys81ljagkfdpbmrvd3mgtlqgmtaumdsgv2lunjq7ihg2nckgqxbwbgvxzwjlaxqvntm3ljm2ichlsfrntcwgbglrzsbhzwnrbykgq2hyb21llzexny4wljaumcbtywzhcmkvntm3ljm2in0simyiolt7imeioijjbgljiiwidci6imxpbmsilcjpijoimja3mzqxncisimqioijodhrwczovl2ludgvybmf0aw9uywwudw5plndyb2mucgwvzw4vywrtaxnzaw9ulwz1bgwtzgvncmvllxn0dwrpzxmvchjvz3jhbw1lcy1lbmdsaxnol2ludgvybmf0aw9uywwtcmvsyxrpb25zlwdsb2jhbc1zdhvkawvzlwjhy2hlbg9yiiwibci6injldmvudwuilcjleci6eyjwdci6inaifx1dfq%3d%3d&taps=null	clr93awzf00408usd5umk1e89	2300	6	72	3	aug 2024	EN	{Full-time}
clr93b112005o8usd1ccj4l6r	graphic design	the market of art has been growing dynamically both in poland and abroad and reconstruction of the value of the market of advertising has become a fact. if you are interested in art and have artistic flair which you would like to develop, studies in the field of graphic design at the vistula university in warsaw are what you are looking for.	oct 2024	b.a.	on campus	year	https://sl.prtl.co/track/click/?target=https%3a%2f%2fstudyatvistula.com%2fprogrammes%2fbachelor-programmes%2fba-in-graphic-design%2f%3fmicrosite%3dtrue&facts=eyjsijp7inqioijzdhvkesisimkioiiznzq3njmilcjkijoir3jhcghpyybezxnpz24ilcjsijoichjlbwl1bsj9lcjzijpudwxslcj1ijp7imkioii2mi4yndeuntaundqilcjzijoimmjjnge1owmtzddhzs00nwrmltkwytctyzc5mzuxyzawmdq0iiwibci6imvuludciiwiyyi6imrliiwiysi6ik1vemlsbgevns4wichxaw5kb3dzie5uidewlja7ifdpbjy0oyb4njqpiefwcgxlv2vis2l0lzuzny4zniaos0hutuwsigxpa2ugr2vja28pienocm9tzs8xmtcumc4wljagu2fmyxjplzuzny4znij9lcjmijpbeyjhijoiy2xpyyisinqioijsaw5riiwiasi6ijiyndu0nzyilcjkijoiahr0chm6ly9zdhvkewf0dmlzdhvsys5jb20vchjvz3jhbw1lcy9iywnozwxvci1wcm9ncmftbwvzl2jhlwlulwdyyxboawmtzgvzawdulz9tawnyb3npdgu9dhj1zsisimwioijyzxzlbnvliiwizxgionsichqioijwin19xx0%3d&taps=null	clr93awtf003w8usd6nuw9zz0	2500	\N	87	3	unknown	PL	{Full-time}
clr93b18e005p8usdd952hxo7	business management (ba hons)	this business management (ba hons) bba program from swiss school of business and management will allow you to earn a degree validated and awarded by the uk university and delivered by ssbm and othm. the bba program offers a unique opportunity to achieve a bba degree with an accredited uk university.	unknown	b.b.a.	online	year	https://sl.prtl.co/track/click/?target=https%3a%2f%2fwww.global-ssbm.ch%2fprogrammes%2fonline%2fba-hons-business-management%2f%3fmicrosite%3dtrue&facts=eyjsijp7inqioijzdhvkesisimkioiiyotywmzmilcjkijoiqnvzaw5lc3mgtwfuywdlbwvudcaoqkegsg9ucykilcjsijoichjlbwl1bsj9lcjzijpudwxslcj1ijp7imkioii2mi4yndeuntaundqilcjzijoimmjjnge1owmtzddhzs00nwrmltkwytctyzc5mzuxyzawmdq0iiwibci6imvuludciiwiyyi6imrliiwiysi6ik1vemlsbgevns4wichxaw5kb3dzie5uidewlja7ifdpbjy0oyb4njqpiefwcgxlv2vis2l0lzuzny4zniaos0hutuwsigxpa2ugr2vja28pienocm9tzs8xmtcumc4wljagu2fmyxjplzuzny4znij9lcjmijpbeyjhijoiy2xpyyisinqioijsaw5riiwiasi6ijixntixntiilcjkijoiahr0chm6ly93d3cuz2xvymfslxnzym0uy2gvchjvz3jhbw1lcy9vbmxpbmuvymetag9ucy1idxnpbmvzcy1tyw5hz2vtzw50lz9tawnyb3npdgu9dhj1zsisimwioijyzxzlbnvliiwizxgionsichqioijwin19xx0%3d&taps=null	clr93ax1000418usd5xvz7pw5	4500	\N	\N	3	unknown	EN	{Part-time}
clr93b2p1005w8usd2espalla	international relations	a professional career in an international environment is an exciting adventure. you will be perfectly prepared to pursue such a career by graduating in international relations field of study at vistula university in warsaw. our program, staff and infrastructure have been highly rated by the polish accreditation committee.	feb 2024	b.a.	on campus	year	https://sl.prtl.co/track/click/?target=https%3a%2f%2fstudyatvistula.com%2fprogrammes%2fbachelor-programmes%2fba-in-international-relations%2f%3fmicrosite%3dtrue&facts=eyjsijp7inqioijzdhvkesisimkioiiznzq3njqilcjkijoisw50zxjuyxrpb25hbcbszwxhdglvbnmilcjsijoichjlbwl1bsj9lcjzijpudwxslcj1ijp7imkioii2mi4yndeuntaundqilcjzijoimmjjnge1owmtzddhzs00nwrmltkwytctyzc5mzuxyzawmdq0iiwibci6imvuludciiwiyyi6imrliiwiysi6ik1vemlsbgevns4wichxaw5kb3dzie5uidewlja7ifdpbjy0oyb4njqpiefwcgxlv2vis2l0lzuzny4zniaos0hutuwsigxpa2ugr2vja28pienocm9tzs8xmtcumc4wljagu2fmyxjplzuzny4znij9lcjmijpbeyjhijoiy2xpyyisinqioijsaw5riiwiasi6ijiyndu0nzcilcjkijoiahr0chm6ly9zdhvkewf0dmlzdhvsys5jb20vchjvz3jhbw1lcy9iywnozwxvci1wcm9ncmftbwvzl2jhlwlulwludgvybmf0aw9uywwtcmvsyxrpb25zlz9tawnyb3npdgu9dhj1zsisimwioijyzxzlbnvliiwizxgionsichqioijwin19xx0%3d&taps=null	clr93awtf003w8usd6nuw9zz0	2500	\N	87	3	jan 2024	PL	{Full-time,Part-time}
clr93b1gg005q8usd23nvfk9a	business and administration (specialisations - business, finance, governance)	the bachelor of business and administration is taught entirely in english and is open to both international and polish students and focuses on basic business related topics, such as leadership, marketing, accountancy, finance, management, research methods, international economics, entrepreneurship, law, human resource management and intercultural communication.	oct 2024	b.b.a.	on campus	year	https://sl.prtl.co/track/click/?target=https%3a%2f%2finternational.uni.wroc.pl%2fen%2fadmission-full-degree-studies%2fprogrammes-english%2fbusiness-and-administration-specialisations&facts=eyjsijp7inqioijzdhvkesisimkioiixmzczmdeilcjkijoiqnvzaw5lc3mgyw5kiefkbwluaxn0cmf0aw9uichtcgvjawfsaxnhdglvbnmglsbcdxnpbmvzcywgrmluyw5jzswgr292zxjuyw5jzskilcjsijoichjlbwl1bsj9lcjzijpudwxslcj1ijp7imkioii2mi4yndeuntaundqilcjzijoimmjjnge1owmtzddhzs00nwrmltkwytctyzc5mzuxyzawmdq0iiwibci6imvuludciiwiyyi6imrliiwiysi6ik1vemlsbgevns4wichxaw5kb3dzie5uidewlja7ifdpbjy0oyb4njqpiefwcgxlv2vis2l0lzuzny4zniaos0hutuwsigxpa2ugr2vja28pienocm9tzs8xmtcumc4wljagu2fmyxjplzuzny4znij9lcjmijpbeyjhijoiy2xpyyisinqioijsaw5riiwiasi6ije5nda1nduilcjkijoiahr0chm6ly9pbnrlcm5hdglvbmfslnvuas53cm9jlnbsl2vul2fkbwlzc2lvbi1mdwxslwrlz3jlzs1zdhvkawvzl3byb2dyyw1tzxmtzw5nbglzac9idxnpbmvzcy1hbmqtywrtaw5pc3ryyxrpb24tc3bly2lhbglzyxrpb25ziiwibci6injldmvudwuilcjleci6eyjwdci6inaifx1dfq%3d%3d&taps=null	clr93awzf00408usd5umk1e89	2300	6	72	3	aug 2024	EN	{Full-time}
clr93b1ni005r8usd7ys6cg0v	criminal justice	studies in the field of criminal justice enable the acquisition and making use of comprehensive knowledge in the field of substantive criminal law, law of criminal procedural, criminology, forensic science and related sciences in the sphere of counteracting and preventing crime in social and economic life.	oct 2024	b.a.	on campus	year	https://sl.prtl.co/track/click/?target=https%3a%2f%2finternational.uni.wroc.pl%2fen%2fadmission-full-degree-studies%2fprogrammes-english%2fcriminal-justice-515&facts=eyjsijp7inqioijzdhvkesisimkioiiynza0ntmilcjkijoiq3jpbwluywwgsnvzdgljzsisimwioijwcmvtaxvtin0sinmiom51bgwsinuionsiasi6ijyylji0ms41mc40ncisinmioiiyymm0ytu5yy1kn2flltq1zgytotbhny1jnzkzntfjmdawndqilcjsijoizw4tr0iilcjjijoizguilcjhijoitw96awxsys81ljagkfdpbmrvd3mgtlqgmtaumdsgv2lunjq7ihg2nckgqxbwbgvxzwjlaxqvntm3ljm2ichlsfrntcwgbglrzsbhzwnrbykgq2hyb21llzexny4wljaumcbtywzhcmkvntm3ljm2in0simyiolt7imeioijjbgljiiwidci6imxpbmsilcjpijoimjeyndmxmcisimqioijodhrwczovl2ludgvybmf0aw9uywwudw5plndyb2mucgwvzw4vywrtaxnzaw9ulwz1bgwtzgvncmvllxn0dwrpzxmvchjvz3jhbw1lcy1lbmdsaxnol2nyaw1pbmfslwp1c3rpy2utnte1iiwibci6injldmvudwuilcjleci6eyjwdci6inaifx1dfq%3d%3d&taps=null	clr93awzf00408usd5umk1e89	2300	6	72	3	aug 2024	EN	{Full-time}
clr93b1uw005s8usd1vbxa4gt	economics	for many years now, economics has been among the most frequently chosen fields of study. specialists in this area are needed in all industries and they earn very good salaries. as a graduate of economics at vistula university in warsaw, you too can join this elite group.	feb 2024	b.a.	on campus	year	https://sl.prtl.co/track/click/?target=https%3a%2f%2fstudyatvistula.com%2fprogrammes%2fbachelor-programmes%2fba-in-economics%2f%3fmicrosite%3dtrue&facts=eyjsijp7inqioijzdhvkesisimkioiiznzq3njailcjkijoirwnvbm9tawnziiwibci6inbyzw1pdw0ifswicyi6bnvsbcwidsi6eyjpijoinjiumjqxljuwljq0iiwicyi6ijjiyzrhntljlwq3ywutndvkzi05mge3lwm3otm1mwmwmda0ncisimwioijlbi1hqiisimmioijkzsisimeioijnb3ppbgxhlzuumcaov2luzg93cybovcaxmc4woybxaw42ndsgedy0ksbbchbszvdlyktpdc81mzcumzygketive1mlcbsawtliedly2tvksbdahjvbwuvmte3ljaumc4wifnhzmfyas81mzcumzyifswizii6w3siysi6imnsawmilcj0ijoibgluayisimkioiiymjq1ndcziiwizci6imh0dhbzoi8vc3r1zhlhdhzpc3r1bgeuy29tl3byb2dyyw1tzxmvymfjagvsb3itchjvz3jhbw1lcy9iys1pbi1ly29ub21py3mvp21py3jvc2l0zt10cnvliiwibci6injldmvudwuilcjleci6eyjwdci6inaifx1dfq%3d%3d&taps=null	clr93awtf003w8usd6nuw9zz0	2500	\N	87	3	jan 2024	PL	{Full-time,Part-time}
clr93b223005t8usdcb7ogos2	finance and accounting with acca	knowledge and competence in the field of finance and accounting mean recognition and prestige. the demand for specialists in this area is still high as they are needed in almost every company, institution or in state and local administration. that is why, finance and accounting with acca remains one of the most popular fields of study at vistula university in warsaw.	feb 2024	b.a.	on campus	year	https://sl.prtl.co/track/click/?target=https%3a%2f%2fstudyatvistula.com%2fprogrammes%2fbachelor-programmes%2fba-in-finance-and-accounting-with-acca%2f%3fmicrosite%3dtrue&facts=eyjsijp7inqioijzdhvkesisimkioiiznzq3njiilcjkijoirmluyw5jzsbhbmqgqwnjb3vudgluzyb3axroiefdq0eilcjsijoichjlbwl1bsj9lcjzijpudwxslcj1ijp7imkioii2mi4yndeuntaundqilcjzijoimmjjnge1owmtzddhzs00nwrmltkwytctyzc5mzuxyzawmdq0iiwibci6imvuludciiwiyyi6imrliiwiysi6ik1vemlsbgevns4wichxaw5kb3dzie5uidewlja7ifdpbjy0oyb4njqpiefwcgxlv2vis2l0lzuzny4zniaos0hutuwsigxpa2ugr2vja28pienocm9tzs8xmtcumc4wljagu2fmyxjplzuzny4znij9lcjmijpbeyjhijoiy2xpyyisinqioijsaw5riiwiasi6ijiyndu0nzuilcjkijoiahr0chm6ly9zdhvkewf0dmlzdhvsys5jb20vchjvz3jhbw1lcy9iywnozwxvci1wcm9ncmftbwvzl2jhlwlulwzpbmfuy2utyw5klwfjy291bnrpbmctd2l0ac1hy2nhlz9tawnyb3npdgu9dhj1zsisimwioijyzxzlbnvliiwizxgionsichqioijwin19xx0%3d&taps=null	clr93awtf003w8usd6nuw9zz0	2700	\N	87	3	jan 2024	PL	{Full-time,Part-time}
clr93b2aw005u8usdg15e643l	aviation management (hons)	this aviation management (hons) programme from coventry university is designed to develop resilient professionals who are able to apply specialist knowledge, skills and capabilities in a diverse, global aviation industry.	nov 2023	b.sc.	on campus	year	https://sl.prtl.co/track/click/?target=https%3a%2f%2fstudyatcoventry.com%2fprogramme%2fcoventry-university-wroclaw%2f%3fmicrosite%3dtrue&facts=eyjsijp7inqioijzdhvkesisimkioiizmti1mtgilcjkijoiqxzpyxrpb24gtwfuywdlbwvudcaosg9ucykilcjsijoichjlbwl1bsj9lcjzijpudwxslcj1ijp7imkioii2mi4yndeuntaundqilcjzijoimmjjnge1owmtzddhzs00nwrmltkwytctyzc5mzuxyzawmdq0iiwibci6imvuludciiwiyyi6imrliiwiysi6ik1vemlsbgevns4wichxaw5kb3dzie5uidewlja7ifdpbjy0oyb4njqpiefwcgxlv2vis2l0lzuzny4zniaos0hutuwsigxpa2ugr2vja28pienocm9tzs8xmtcumc4wljagu2fmyxjplzuzny4znij9lcjmijpbeyjhijoiy2xpyyisinqioijsaw5riiwiasi6ijixnza3mzgilcjkijoiahr0chm6ly9zdhvkewf0y292zw50cnkuy29tl3byb2dyyw1tzs9jb3zlbnryes11bml2zxjzaxr5lxdyb2nsyxcvp21py3jvc2l0zt10cnvliiwibci6injldmvudwuilcjleci6eyjwdci6inaifx1dfq%3d%3d&taps=null	clr93awxx003z8usd6h88b7o9	5955	6	\N	3	unknown	EN	{Full-time}
clr93b2hx005v8usddjotgftj	cyber security (hons)	the cyber security (hons) course at coventry university is designed to produce high quality graduates who can contribute effectively in one of the fastest growing sectors globally.	nov 2023	b.sc.	on campus	year	https://sl.prtl.co/track/click/?target=https%3a%2f%2fstudyatcoventry.com%2fprogramme%2fcoventry-university-wroclaw%2f%3fmicrosite%3dtrue&facts=eyjsijp7inqioijzdhvkesisimkioiiyotcynjkilcjkijoiq3lizxigu2vjdxjpdhkgkehvbnmpiiwibci6inbyzw1pdw0ifswicyi6bnvsbcwidsi6eyjpijoinjiumjqxljuwljq0iiwicyi6ijjiyzrhntljlwq3ywutndvkzi05mge3lwm3otm1mwmwmda0ncisimwioijlbi1hqiisimmioijkzsisimeioijnb3ppbgxhlzuumcaov2luzg93cybovcaxmc4woybxaw42ndsgedy0ksbbchbszvdlyktpdc81mzcumzygketive1mlcbsawtliedly2tvksbdahjvbwuvmte3ljaumc4wifnhzmfyas81mzcumzyifswizii6w3siysi6imnsawmilcj0ijoibgluayisimkioiiymtuznjy1iiwizci6imh0dhbzoi8vc3r1zhlhdgnvdmvudhj5lmnvbs9wcm9ncmftbwuvy292zw50cnktdw5pdmvyc2l0es13cm9jbgf3lz9tawnyb3npdgu9dhj1zsisimwioijyzxzlbnvliiwizxgionsichqioijwin19xx0%3d&taps=null	clr93awxx003z8usd6h88b7o9	5955	6	\N	3	unknown	EN	{Full-time}
clr93b2wh005x8usdfuum8ml7	premed	premed at medical university of lodz is organized by the medical university in lodz for international students planning to apply for medical and dentistry programs in order to repeat and improve their knowledge required on the entrance exam.	nov 2024	pre-bachelor	on campus	full	https://sl.prtl.co/track/click/?target=https%3a%2f%2fstudymed.umed.pl%2fadmission%2fpremed%2fabout-premed-course%2f&facts=eyjsijp7inqioijzdhvkesisimkioiizodi2oduilcjkijoiufjftuveiiwibci6inbyzw1pdw0ifswicyi6bnvsbcwidsi6eyjpijoinjiumjqxljuwljq0iiwicyi6ijjiyzrhntljlwq3ywutndvkzi05mge3lwm3otm1mwmwmda0ncisimwioijlbi1hqiisimmioijkzsisimeioijnb3ppbgxhlzuumcaov2luzg93cybovcaxmc4woybxaw42ndsgedy0ksbbchbszvdlyktpdc81mzcumzygketive1mlcbsawtliedly2tvksbdahjvbwuvmte3ljaumc4wifnhzmfyas81mzcumzyifswizii6w3siysi6imnsawmilcj0ijoibgluayisimkioiiymjuzote3iiwizci6imh0dhbzoi8vc3r1zhltzwqudw1lzc5wbc9hzg1pc3npb24vchjlbwvkl2fib3v0lxbyzw1lzc1jb3vyc2uviiwibci6injldmvudwuilcjleci6eyjwdci6inaifx1dfq%3d%3d&taps=null	clr93awuw003x8usd0g4z85dz	6500	\N	\N	0.7	sep 2024	EN	{Full-time}
clr93b33x005y8usd3fwp57ak	management polish-british double diploma programme	the management polish-british double diploma programme students to obtain diplomas from two universities, namely the vistula university in warsaw and its partner university, london south bank university, within just one course of studies.the programme is delivered in english.	feb 2024	b.a.	on campus	year	https://sl.prtl.co/track/click/?target=https%3a%2f%2fstudyatvistula.com%2fprogrammes%2fbachelor-programmes%2fmanagement-double-diploma-ba-programme-vistula-university-and-london-south-bank-university%2f%3fmicrosite%3dtrue&facts=eyjsijp7inqioijzdhvkesisimkioiiznzq3njcilcjkijoitwfuywdlbwvudcbqb2xpc2gtqnjpdglzacbkb3vibgugzglwbg9tysbwcm9ncmftbwuilcjsijoichjlbwl1bsj9lcjzijpudwxslcj1ijp7imkioii2mi4yndeuntaundqilcjzijoimmjjnge1owmtzddhzs00nwrmltkwytctyzc5mzuxyzawmdq0iiwibci6imvuludciiwiyyi6imrliiwiysi6ik1vemlsbgevns4wichxaw5kb3dzie5uidewlja7ifdpbjy0oyb4njqpiefwcgxlv2vis2l0lzuzny4zniaos0hutuwsigxpa2ugr2vja28pienocm9tzs8xmtcumc4wljagu2fmyxjplzuzny4znij9lcjmijpbeyjhijoiy2xpyyisinqioijsaw5riiwiasi6ijiyndu0odailcjkijoiahr0chm6ly9zdhvkewf0dmlzdhvsys5jb20vchjvz3jhbw1lcy9iywnozwxvci1wcm9ncmftbwvzl21hbmfnzw1lbnqtzg91ymxllwrpcgxvbwetymetchjvz3jhbw1llxzpc3r1bgetdw5pdmvyc2l0es1hbmqtbg9uzg9ulxnvdxrolwjhbmstdw5pdmvyc2l0es8%2fbwljcm9zaxrlpxrydwuilcjsijoicmv2zw51zsisimv4ijp7inb0ijoiccj9fv19&taps=null	clr93awtf003w8usd6nuw9zz0	3900	\N	87	3	jan 2024	EN	{Full-time}
clr93b3av005z8usd8ap3gp5d	architecture	the architecture programme at the vistula university embraces four-year engineering studies addressed to candidates of great versatility. the studies combine strict sciences, humanities and art.	feb 2024	bachelor	on campus	year	https://sl.prtl.co/track/click/?target=https%3a%2f%2fstudyatvistula.com%2fprogrammes%2fengineers-degrees%2farchitecture%2f%3fmicrosite%3dtrue&facts=eyjsijp7inqioijzdhvkesisimkioiizotmxnjgilcjkijoiqxjjagl0zwn0dxjliiwibci6inbyzw1pdw0ifswicyi6bnvsbcwidsi6eyjpijoinjiumjqxljuwljq0iiwicyi6ijjiyzrhntljlwq3ywutndvkzi05mge3lwm3otm1mwmwmda0ncisimwioijlbi1hqiisimmioijkzsisimeioijnb3ppbgxhlzuumcaov2luzg93cybovcaxmc4woybxaw42ndsgedy0ksbbchbszvdlyktpdc81mzcumzygketive1mlcbsawtliedly2tvksbdahjvbwuvmte3ljaumc4wifnhzmfyas81mzcumzyifswizii6w3siysi6imnsawmilcj0ijoibgluayisimkioiiymjy1ntk4iiwizci6imh0dhbzoi8vc3r1zhlhdhzpc3r1bgeuy29tl3byb2dyyw1tzxmvzw5naw5lzxjzlwrlz3jlzxmvyxjjagl0zwn0dxjllz9tawnyb3npdgu9dhj1zsisimwioijyzxzlbnvliiwizxgionsichqioijwin19xx0%3d&taps=null	clr93awtf003w8usd6nuw9zz0	3000	\N	72	4	unknown	EN	{Full-time}
clr93b3hz00608usd8orfa9t3	civil engineering	b.sc. civil engineering from warsaw university of technology deals with construction of such facilities as buildings, bridges, tunnels, airports, railways, highways and environmental systems.	oct 2024	b.sc.	on campus	year		clr93ax2f00428usd3w7xbuow	1576	6	87	4	jul 2024	EN	{Full-time}
clr93b3pd00618usdb3635smf	architecture	the architecture programme from warsaw university of technology intended international attraction, its curriculum, number of teaching hours and intended pedagogical effects meet with the requirements of the polish ministry of science and higher education and the chamber of polish architects.	oct 2024	b.sc.	on campus	year		clr93ax2f00428usd3w7xbuow	1584	6.5	\N	4	may 2024	EN	{Full-time}
clr93b3wb00628usd7kvy8fve	financial management	the financial management program from kozminski university is a best-practice-based opportunity for creative and passionate young people to join a diverse international community of peers and seasoned experts in order to master finance 5.0 challenges in the coming decades	feb 2024	bachelor	on campus	year		clr93ax3u00438usd11tc684q	6670	6	87	3	unknown	EN	{Full-time}
clr93b43c00638usdb511hd0l	management and artificial intelligence	the management and artificial intelligence program from kozminski university is a rare, but very necessary combination of insightful management knowledge with programming skills and data analytics.	feb 2024	bachelor	on campus	year		clr93ax3u00438usd11tc684q	6670	6	87	3	unknown	EN	{Full-time}
clr93b4a700648usdf14m1xgj	electrical engineering	the electrical engineering area of study from warsaw university of technology embraces a great variety of subjects. two specialisations are currently offered: control and computer engineering and electrical power engineering.	oct 2024	b.sc.	on campus	free		clr93ax2f00428usd3w7xbuow	0	6	87	4	jul 2024	EN	{Full-time}
clr93b4h900658usdgpjmbtlo	aerospace engineering	during the first year of this aerospace engineering program from the warsaw university of technology focus on mathematics, physics, mechanics, thermodynamics and computer science.	oct 2024	b.sc.	on campus	free		clr93ax2f00428usd3w7xbuow	0	6	87	3.5	jul 2024	EN	{Full-time}
clr93b4o500668usd5z4xh8st	environmental engineering	the major objective of b.sc. environmental engineering from warsaw university of technology is to provide high quality, interdisciplinary knowledge and skills to people searching for solutions to the environmental problems of today and the future, concerning: water resources protection, air pollution control, solid waste management, environmental impact assessment, renewable energy systems	oct 2024	b.sc.	on campus	year		clr93ax2f00428usd3w7xbuow	1100	6	87	4	jul 2024	EN	{Full-time}
clr93b4v400678usdc5y3e0cx	management	the three-year management programme from kozminski university is designed for students who are interested in pursuing managerial and entrepreneurial careers in both domestic and international companies.	feb 2024	bachelor	on campus	year		clr93ax3u00438usd11tc684q	6670	6	87	3	unknown	EN	{Full-time}
clr93b52300688usd758n0hqd	mechatronics	the mechatronics from warsaw university of technology aims to prepare students to design mechatronic devices and solve complex, interdisciplinary design and construction problems.	oct 2024	b.sc.	on campus	free		clr93ax2f00428usd3w7xbuow	0	6	87	3.5	jul 2024	EN	{Full-time}
clr93b59200698usd3f2l9kl9	power engineering	the objectives of the power engineering program from warsaw university of technology is to create the solid fundamental engineering knowledge during the first year of the study, then learn deeply the problems devoted to the subject of the study. graduates are prepared to work in industry and to solve engineering problems.	oct 2024	b.sc.	on campus	free		clr93ax2f00428usd3w7xbuow	0	6	86	3.5	jul 2024	EN	{Full-time}
clr93b5fv006a8usdd3zq8n0i	telecommunications	the field of study encompasses information technology, control, robotics, electronics, and telecommunications.the telecommunications from warsaw university of technology  covers a great variety of subjects from diverse technology fields.	oct 2024	b.sc.	on campus	year		clr93ax2f00428usd3w7xbuow	2654	6	87	4	jul 2024	EN	{Full-time}
clr93b5mp006b8usdg2ia5znq	automotive mechatronics	b.sc. automotive mechatronics from warsaw university of technology will help you to become an engineer meeting the challenges of designing, operating and servicing the most modern vehicles in the automotive and construction machinery market.	oct 2024	b.sc.	on campus	year		clr93ax2f00428usd3w7xbuow	1438	6	87	3.5	jul 2024	EN	{Full-time}
clr93b5u5006c8usd1q3j1rk9	electric and hybrid vehicles engineering	the b.sc. electric and hybrid vehicles engineering from warsaw university of technology provides students with multidisciplinary knowledge in complex technical far-transportation structures with systems of energy recuperation and accumulation.	oct 2024	b.sc.	on campus	year		clr93ax2f00428usd3w7xbuow	1438	6	78	3.5	jul 2024	EN	{Full-time}
clr93b61r006d8usdc36m0jsw	computer science and information systems	for the first three semesters, computer science and information systems from warsaw university of technology covers the basics of mathematics, which allows for the effective learning of computer science and programming techniques in the next semesters.	oct 2024	b.sc.	on campus	year		clr93ax2f00428usd3w7xbuow	1848	6	87	3.5	jul 2024	EN	{Full-time}
clr93b68z006e8usdg4rkh3ms	computer systems and networks	for the first three semesters, the computer systems and networks from warsaw university of technology covers the basics of mathematics, which allows for the effective learning of computer science and programming techniques in the next semesters.	oct 2024	b.sc.	on campus	year		clr93ax2f00428usd3w7xbuow	2654	6	87	3	jul 2024	EN	{Full-time}
clr93b6fp006f8usd6gahf9ij	sport	the sport ba from gdansk university of physical education and sport is the only programme where theoretical and practical classes are conducted by both recognized scientists and highly qualified specialists in the areas relevant to individual fields of study, as well as coaches of olympic and national teams and outstanding athletes.	oct 2024	bachelor	on campus	year		clr93ax5d00448usd00a40ecl	2700	\N	57	3	aug 2024	EN	{Full-time}
clr93b6mt006g8usdb42m5yvn	tourism and hospitality	the tourism and hospitality (bachelor’s level) programme at gdansk university of physical education and sport is an ideal choice for those who want to work in a dynamic environment.	oct 2024	bachelor	on campus	year	https://sl.prtl.co/track/click/?target=https%3a%2f%2fawf.gda.pl%2finternational%2fenglish-division-i-first-bachelor-degree%2ftourism-and-hospitality%2f&facts=eyjsijp7inqioijzdhvkesisimkioiiznte1ntgilcjkijoivg91cmlzbsbhbmqgsg9zcgl0ywxpdhkilcjsijoichjlbwl1bsj9lcjzijpudwxslcj1ijp7imkioii2mi4yndeuntaundqilcjzijoimmjjnge1owmtzddhzs00nwrmltkwytctyzc5mzuxyzawmdq0iiwibci6imvuludciiwiyyi6imrliiwiysi6ik1vemlsbgevns4wichxaw5kb3dzie5uidewlja7ifdpbjy0oyb4njqpiefwcgxlv2vis2l0lzuzny4zniaos0hutuwsigxpa2ugr2vja28pienocm9tzs8xmtcumc4wljagu2fmyxjplzuzny4znij9lcjmijpbeyjhijoiy2xpyyisinqioijsaw5riiwiasi6ijiymtkwmzqilcjkijoiahr0chm6ly9hd2yuz2rhlnbsl2ludgvybmf0aw9uywwvzw5nbglzac1kaxzpc2lvbi1plwzpcnn0lwjhy2hlbg9ylwrlz3jlzs90b3vyaxntlwfuzc1ob3nwaxrhbgl0es8ilcjsijoicmv2zw51zsisimv4ijp7inb0ijoiccj9fv19&taps=null	clr93ax5d00448usd00a40ecl	2500	\N	57	3	aug 2024	EN	{Full-time}
clr93b6ue006h8usd746pc17i	cosmetology	studies in field of cosmetology at gdansk university of physical education and sport focus on issues related with caring, beautifying and medical cosmetology as well as consciously taking care of a healthy lifestyle, balanced nutrition and physical activity promotion.	oct 2024	bachelor	on campus	year	https://sl.prtl.co/track/click/?target=https%3a%2f%2fawf.gda.pl%2finternational%2fenglish-division-i-first-bachelor-degree%2fcosmetology%2f&facts=eyjsijp7inqioijzdhvkesisimkioiiznte1njeilcjkijoiq29zbwv0b2xvz3kilcjsijoichjlbwl1bsj9lcjzijpudwxslcj1ijp7imkioii2mi4yndeuntaundqilcjzijoimmjjnge1owmtzddhzs00nwrmltkwytctyzc5mzuxyzawmdq0iiwibci6imvuludciiwiyyi6imrliiwiysi6ik1vemlsbgevns4wichxaw5kb3dzie5uidewlja7ifdpbjy0oyb4njqpiefwcgxlv2vis2l0lzuzny4zniaos0hutuwsigxpa2ugr2vja28pienocm9tzs8xmtcumc4wljagu2fmyxjplzuzny4znij9lcjmijpbeyjhijoiy2xpyyisinqioijsaw5riiwiasi6ijiymtkwmzcilcjkijoiahr0chm6ly9hd2yuz2rhlnbsl2ludgvybmf0aw9uywwvzw5nbglzac1kaxzpc2lvbi1plwzpcnn0lwjhy2hlbg9ylwrlz3jlzs9jb3ntzxrvbg9nes8ilcjsijoicmv2zw51zsisimv4ijp7inb0ijoiccj9fv19&taps=null	clr93ax5d00448usd00a40ecl	2500	\N	57	3	aug 2024	EN	{Full-time}
clr93b71o006i8usde3am3109	occupational therapy	in this occupational therapy programme, from gdansk university of physical education and sport the student gets acquainted with occupational therapy - with its definition, goals, forms, methods, types, as well as the scopes and areas of its impact.	oct 2024	bachelor	on campus	year	https://sl.prtl.co/track/click/?target=https%3a%2f%2fawf.gda.pl%2finternational%2fenglish-division-i-first-bachelor-degree%2foccupational-therapy%2f&facts=eyjsijp7inqioijzdhvkesisimkioiiznte1ntkilcjkijoit2njdxbhdglvbmfsifrozxjhchkilcjsijoichjlbwl1bsj9lcjzijpudwxslcj1ijp7imkioii2mi4yndeuntaundqilcjzijoimmjjnge1owmtzddhzs00nwrmltkwytctyzc5mzuxyzawmdq0iiwibci6imvuludciiwiyyi6imrliiwiysi6ik1vemlsbgevns4wichxaw5kb3dzie5uidewlja7ifdpbjy0oyb4njqpiefwcgxlv2vis2l0lzuzny4zniaos0hutuwsigxpa2ugr2vja28pienocm9tzs8xmtcumc4wljagu2fmyxjplzuzny4znij9lcjmijpbeyjhijoiy2xpyyisinqioijsaw5riiwiasi6ijiymtkwmzyilcjkijoiahr0chm6ly9hd2yuz2rhlnbsl2ludgvybmf0aw9uywwvzw5nbglzac1kaxzpc2lvbi1plwzpcnn0lwjhy2hlbg9ylwrlz3jlzs9vy2n1cgf0aw9uywwtdghlcmfwes8ilcjsijoicmv2zw51zsisimv4ijp7inb0ijoiccj9fv19&taps=null	clr93ax5d00448usd00a40ecl	2500	\N	57	3	aug 2024	EN	{Full-time}
clr93b78l006j8usd36rb2vo4	archaeology	the archaeology study programme at the university of warsaw is designed to give students the best training in the archaeological profession and to provide them with knowledge and skills helpful for a good start in other fields.	oct 2024	b.a.	on campus	free		clr93ax6x00458usdfjw16d2o	0	5.5	72	3	jul 2024	EN	{Full-time}
clr93b7fo006k8usdhrpp8rd7	artificial intelligence	artificial intelligence (ai) from poznan university of technology is oriented toward development and application of computational technologies that are inspired by the ways people learn, reason, and make decisions.	oct 2024	b.sc.	on campus	year		clr93ax8b00468usd2os09yty	3465	5.5	\N	3.5	jul 2024	EN	{Full-time}
clr93b7mt006l8usdd5yg0kma	computer science	computer science at the university of economics and innovation in lublin is a field of knowledge developing in the modern world in an extremely dynamic way, and the profession of a computer scientist is one of the most sought after and profitable in the labor market.	oct 2024	bachelor	on campus	year		clr93ax9t00478usd9hlwcy7j	2500	\N	\N	3.5	jul 2024	EN	{Full-time}
clr93b7tx006m8usd9297990o	automatic control and robotics	graduate of the automatic control and robotics studies from poznan university of technology provide knowledge of basic issues of automation and robotics: dynamic systems, signal processing, robot kinematics, components and industrial automation equipment, design and programming of microprocessor systems, industrial controllers, sensors and vision systems.	oct 2024	b.sc.	on campus	year		clr93ax8b00468usd2os09yty	3032	5.5	\N	3.5	jul 2024	EN	{Full-time}
clr93b80x006n8usd7455e52n	business economics (double degree)	the curriculum of the business economics (double degree) course at lazarski university was prepared by lazarski university in cooperation with coventry university (uk). the teaching process, grades and the quality guarantee are compliant with the british educational standards.	oct 2023	b.a.	on campus	year		clr93axb900488usd580n7wiv	5640	5.5	87	3	unknown	EN	{Full-time}
clr93b88c006o8usdfc2b9lak	electronic and telecommunication engineering	lodz university of technology offers a degree in electronic and telecommunication engineering. students enrolled on the electronic and telecommunication engineering degree program, complete, as part of the curriculum, at least one semester abroad - mobility semester (6th semester).	oct 2024	bachelor	on campus	year		clr93axcw00498usd64zu1pr9	3408	6	87	3.5	jan 2024	EN	{Full-time}
clr93b8fu006p8usda266goat	organic agriculture and food production	organic agriculture and food production from warsaw university of life sciences has the aim to offer the students a holistic and interdisciplinary knowledge in the area of organic agriculture and food production presented by the best specialists from different faculties.	oct 2024	bachelor	on campus	year		clr93axea004a8usd10l9492g	2120	\N	72	3	jul 2024	EN	{Full-time}
clr93b8n9006q8usd3e9q0fi0	english studies	the english studies programme offered by nicolaus copernicus university in torun is addressed to both polish and non-polish undergraduate students. it offers a combination of practical english courses and language studies field-specific seminars and lectures (british and american literature and culture, language acquisition, linguistics, contrastive and descriptive grammar).	oct 2024	b.a.	on campus	year		clr93axgc004b8usddaaxbcc3	1299	6	87	3	jul 2024	EN	{Full-time,Part-time}
clr93b8uh006r8usd8w8t1846	computer science	computer science from university of lodz encompasses software engineering, computer networks, programming, internet portals, computer graphics and artificial intelligence.	oct 2024	b.a.	on campus	year		clr93axhy004c8usddk0b0jql	2130	6	87	3	jul 2024	EN	{Full-time}
clr93b91g006s8usd9zsq5y4q	global and development studies	jagiellonian university's global and development studies (glad) is an interdisciplinary programme, which aims to equip students with fundamental understanding of processes of globalisation in various spheres of human activity: law, politics, economy, history, the social relations, culture and communication.	oct 2024	bachelor	on campus	year		clr93axjc004d8usddjosbvvz	4500	5.5	72	3	aug 2024	EN	{Full-time}
clr93b999006t8usd2nhefxfe	corporate finance and accounting	the corporate finance and accounting programme from cracow university of economics aims at disseminating thorough knowledge of basics of accounting and its international, managerial and financial aspects.	oct 2024	bachelor	on campus	year		clr93axks004e8usd1eynfw11	2382	6	\N	3	jul 2024	EN	{Full-time,Part-time}
clr93b9gp006u8usd55k0ganx	computer science	computer science from agh university of science & technology aims to provide knowledge and skills necessary to create and use computer systems.	oct 2024	b.sc.	on campus	year		clr93axme004f8usdeflj0rxo	4000	\N	87	3.5	sep 2024	EN	{Full-time}
clr93b9ns006v8usd5txdd2f8	electrical engineering	graduates of this bsc in electrical engineering from silesian university of technology acquire knowledge from the fields of electrical engineering, power engineering, automatics, robotics, analog and digital electronics, exploitation of electric systems and programming languages.	oct 2024	b.sc.	on campus	year		clr93axns004g8usd0l0p3hhe	4400	6	87	3.5	jul 2024	EN	{Full-time}
clr93b9uy006w8usdgqgb5gxl	architecture	the architecture curriculum at gdansk university of technology is designed for people wishing to study architecture. it has been developed to educate future architects both in technical knowledge and to develop their awareness within esthetic and human-oriented values.	oct 2024	b.sc.	on campus	year		clr93axp8004h8usdd1gfcdoj	3725	\N	72	4	sep 2024	EN	{Full-time}
clr93ba21006x8usdfuothmk1	international and political studies specialization - security studies	specialty security studies encompasses subjects within national and international security. subjects in offer are dedicated to the phenomenon of security in terms of administration functioning on the local and central level. learn more about this program in international and political studies specialization - security studies from university of lodz.	oct 2024	bachelor	on campus	year		clr93axhy004c8usddk0b0jql	2130	6.5	87	3	jul 2024	EN	{Full-time}
clr93ba8y006y8usdbaw83ryf	energy technologies	the program at gdansk university of technology of the studies allows the students to obtain detailed theoretical knowledge as well as the practical expertise of different aspects related to energy technologies, taking into account design, production, exploitation, diagnostics and maintenance of power and heat plants, power transmission systems and energy distribution installations.	oct 2024	b.sc.	on campus	year		clr93axp8004h8usdd1gfcdoj	3725	\N	72	3.5	sep 2024	EN	{Full-time}
clr93bafz006z8usd87cbfqcc	computer science	lodz university of technology offers a degree in computer science. each student of the international faculty of engineering (ife), as part of the curriculum, completes at least one semester (6th semester) - "mobility semester" - in a foreign university.	oct 2024	bachelor	on campus	year		clr93axcw00498usd64zu1pr9	3408	6	87	3.5	jan 2024	EN	{Full-time}
clr93bkba008c8usdful65vxi	medicine	the medical university of warsaw offers a bachelor's degree in medicine, being one of the best places in poland to study dentistry and medical sciences	oct 2024	bachelor	on campus	year		clr93ayfa004y8usd14noeh1t	13700	6.5	87	6	jun 2024	EN	{Full-time}
clr93banv00708usdegds69tb	animal science and dairy production	animal science and dairy production program from university of life sciences in lublin has a long lasting tradition in specialized teaching of subjects concerning horse breeding and use. the teaching staff  consists of experienced professionals.	oct 2024	b.sc.	on campus	year		clr93axqs004i8usddu4je3la	4000	\N	\N	3.5	jun 2024	EN	{Full-time}
clr93baur00718usd9c5d4els	graphics	the graphics program at university of humanities and economics in lodz prepare future graphic designers for creative and comprehensive design problems in the positions of independent designers, as well as for work in a creative team.	sep 2024	b.a.	on campus	year		clr93axs9004j8usd62sx91k2	2950	\N	\N	3	aug 2024	EN	{Full-time}
clr93bb1r00728usd074o52gd	international relations	international relations from adam mickiewicz university poznan is not only a subject of science, but also a practical course that will allow you to find yourself in a difficult and rapidly changing labour market.	oct 2024	b.a.	on campus	year		clr93axts004k8usd0dpkdcml	1516	\N	\N	3	jul 2024	EN	{Full-time}
clr93bb8r00738usdebewcnc5	diplomacy	the diplomacy degree at lazarski university strives to focus specifically on the recent points of contention and opportunities for cooperation. the faculty teaching the electives are experienced academics as well as professionals, diplomats, and think-tankers. students will also obtain assistance in finding practices in foreign embassies and in think-tanks dealing with international relations.	oct 2023	bachelor	on campus	year		clr93axb900488usd580n7wiv	4560	\N	\N	3	unknown	EN	{Full-time}
clr93bbfn00748usd9cum6jem	finance and accounting - financial analyst	the curriculum of the finance and accounting - financial analyst specialization at university of gdansk consists of general university subjects and specific financial subjects, with a focus on the investment process.	oct 2024	b.a.	on campus	year		clr93axv8004l8usdgp9r0o1u	1429	5.5	87	3	jul 2024	EN	{Full-time}
clr93bbmp00758usdccxm9hbh	finance and accounting for business	finance and accounting for business (fab) is offered by university of economics in katowice. it is the perfect combination of knowledge in the field of corporate finance management and accounting!	oct 2024	bachelor	on campus	year		clr93axwo004m8usd5ljm58bp	1039	5.5	87	3	apr 2024	EN	{Full-time}
clr93bbtx00768usdf1kgg987	economics	the three-year undergraduate bachelor of arts in economics at university of lodz is intended to provide students with tools that will allow them to describe and analyze economic and social reality.	oct 2024	b.a.	on campus	year		clr93axhy004c8usddk0b0jql	2130	6	87	3	jul 2024	EN	{Full-time}
clr93bc0v00778usdha53b9dq	architecture	the 3,5 year bachelor’s degree in architecture program at the faculty of architecture, poznan university of technology aims to propagate creative independent thinking and develop the capability to skillfully construct and significantly improve the built environment.	oct 2024	b.sc.	on campus	year		clr93ax8b00468usd2os09yty	3465	5.5	\N	4	jul 2024	EN	{Full-time}
clr93bc8300788usdh3k23ueu	earth sciences in a changing world	jagiellonian university's earth sciences in a changing world is an undergraduate interdisciplinary programme that offers a rigorous international and comparative perspective on the contemporary global system.	oct 2024	bachelor	on campus	year		clr93axjc004d8usddjosbvvz	3149	5.5	72	3	aug 2024	EN	{Full-time}
clr93bcf200798usd0jcf3i3b	american studies	graduates of university of warsaw's american studies center have specialized knowledge about american society and culture, and the relations between the u.s. and the world, including europe.	oct 2024	b.a.	on campus	free		clr93ax6x00458usdfjw16d2o	0	5.5	72	3	jul 2024	EN	{Full-time}
clr93bcm4007a8usd341mbqtc	european studies	our the european studies from the john paul ii catholic university of lublin graduates obtain qualifications of specialist for european affairs.	oct 2024	b.a.	on campus	free		clr93axy6004n8usddmdm53eb	0	6	87	3	jul 2024	EN	{Full-time}
clr93bctc007b8usd8eq4akcw	management and production engineering - management of production systems	the major objective of the field of study management and production engineering - management of production systems from the silesian university of technology s delivery of a professional bachelor of science, suitable for the needs of an enterprise operating in the conditions of free-market economy.	oct 2024	b.sc.	on campus	year		clr93axns004g8usd0l0p3hhe	2800	5.5	83	3.5	jul 2024	EN	{Full-time}
clr93bd0l007c8usdh4lra4e8	engineering of management (with preparatory year)	these programs are designed for applicants who would like to improve their english skills from pre-intermediate to advanced level and also for those who would like to apply for our ba programs, but do not yet have the required level of english knowledge to start the chosen program. join the engineering of management (with preparatory year) program from academy of business in dabrowa górnicza.	oct 2024	b.sc.	on campus	year		clr93axzm004o8usd0qaz5pfa	1698	\N	\N	4.5	unknown	EN	{Full-time}
clr93bd7j007d8usd7etc2ln3	economics in english	the three-year undergraduate program in economics in english at the faculty of economics and sociology of the university of lodz is intended to provide students with tools that will allow them to describe and analyze economic and social reality.	oct 2024	bachelor	on campus	year		clr93axhy004c8usddk0b0jql	2130	6	87	3	jul 2024	EN	{Full-time}
clr93bden007e8usd6kv828x6	international and political studies specialization: american studies	the program of bachelor studies in the field of american studies is aimed at providing students with basic knowledge about issues related to north american and latin american societies, politics, culture and media learn more with this bachelor in international and political studies specialization: american studies from university of lodz.	oct 2024	bachelor	on campus	year		clr93axhy004c8usddk0b0jql	2130	6	87	3	jul 2024	EN	{Full-time}
clr93bdlr007f8usda5okefsq	modelling and data science	data scientist has been identified as one of the most promising and lucrative professions of the 21st century. lodz university of technology offers a degree in modelling and data science.	oct 2024	bachelor	on campus	year		clr93axcw00498usd64zu1pr9	3408	6	87	4	jan 2024	EN	{Full-time}
clr93bdsy007g8usd6hd07k33	materials science and engineering	materials science and engineering from university of silesia in katowice  is an interdisciplinary field of science, which analyses the influence of materials’ chemical and physical structure on their electrical, mechanical, optical, surface, chemical, magnetic and thermal properties as well as on various combinations of those properties.	oct 2024	b.eng.	on campus	free		clr93ay12004p8usde47xaqko	0	\N	100	3.5	jul 2024	EN	{Full-time}
clr93be1m007h8usdhmp641kt	applied linguistics and intercultural communication	adam mickiewicz university poznan's applied linguistics and intercultural communication ba program is an engaging and multidisciplinary academic offering that immerses students in the study of language, culture, and communication, fostering a deep understanding of these interconnected fields.	oct 2024	b.a.	on campus	year		clr93axts004k8usd0dpkdcml	1299	\N	\N	3	jul 2024	EN	{Full-time}
clr93be8y007i8usddgxvafqb	midwifery	midwifery from medical university of lublin meets national and eu standards and requirements of medical education. the candidates can apply for admission to the 3-year undergraduate program that will prepare them for a challenging but also very rewarding career as a midwife.	oct 2024	bachelor	on campus	year		clr93ay2k004q8usdas499gmq	6300	\N	\N	3	unknown	EN	{Full-time}
clr93bega007j8usdaz0dd2vv	finance	finance at the poznan university of economics and business is an elite and interdisciplinary program in english,  which encompasses both  general knowledge in the field of economics and management and specialist practical and theoretical knowledge in the field of finance.	oct 2024	b.sc.	on campus	year		clr93ay3y004r8usd4nbq5yse	2486	6	70	3	unknown	EN	{Full-time}
clr93ben9007k8usdhpr65cto	medical biology	medical biology from maria curie-sklodowska university has been developed as an academic bridge  (premedical studies)  for students interested in pursuing a career as a physician or those who have never before taken introductory natural sciences courses.	oct 2024	b.sc.	on campus	year		clr93ay5g004s8usd3ge09dlb	4000	6	87	3	sep 2024	EN	{Full-time}
clr93beuc007l8usd5hwh2j6o	electronics and telecommunications	at electronics and telecommunications from agh university of science & technology the graduate is awarded an engineer degree (being an equivalent of a bachelor of science degree) in electronics and telecommunications.	oct 2024	b.sc.	on campus	year		clr93axme004f8usdeflj0rxo	1750	\N	87	3.5	sep 2024	EN	{Full-time}
clr93bf1m007m8usd1xqd4hm8	power engineering	power engineering programme at the silesian university of technology  includes problems of contemporary power engineering, among others modern energy technologies, machines and energy devices, innovative and modernization processes in the power sector, energy technologies using renewable energy sources, energy management and the impact of energy systems on the environment.	oct 2024	b.sc.	on campus	year		clr93axns004g8usd0l0p3hhe	3000	6	87	3.5	jul 2024	EN	{Full-time}
clr93bf93007n8usdfbm083wg	mechanical engineering	the aim of the mechanical engineering studies from gdansk university of technology is to educate specialists in the field of widely understood mechanical engineering, which includes the construction, manufacturing and operation of machines.	oct 2024	b.sc.	on campus	year		clr93axp8004h8usdd1gfcdoj	3725	\N	72	3.5	sep 2024	EN	{Full-time}
clr93bfgb007o8usd9961dm5f	management (with preparatory year)	these programs are designed for applicants who would like to improve their english skills from pre-intermediate to advanced level and also for those who would like to apply for our ba programs, but do not yet have the required level of english knowledge to start the chosen program. join the management (with preparatory year) programme from academy of business in dabrowa górnicza.	oct 2024	b.sc.	on campus	year		clr93axzm004o8usd0qaz5pfa	1698	\N	\N	4	unknown	EN	{Full-time}
clr93bfng007p8usd2zcx75fc	equine management and care	the equine management and care program from university of life sciences in lublin has a long lasting tradition in specialized teaching of subjects concerning horse breeding and use. the teaching staff  consists of experienced professionals.	oct 2024	bachelor	on campus	year		clr93axqs004i8usddu4je3la	5900	\N	\N	3	jun 2024	EN	{Full-time}
clr93bfuy007q8usdb2vk377u	journalism and social communication	journalism and social communication from the john paul ii catholic university of lublin allow you to gain a professional workshop of a journalist or a specialist in social communication.	oct 2024	b.a.	on campus	free		clr93axy6004n8usddmdm53eb	0	6	87	3	jul 2024	EN	{Full-time}
clr93bg2r007r8usddt1q4eep	chemistry	the course of chemistry at nicolaus copernicus university in torun offers first degree studies based on the elements of mathematics and natural sciences combining knowledge of basic chemistry, analytical chemistry, physical, organic, inorganic, quantum chemistry, chemistry of materials, environmental chemistry and ecology as well as technology and chemical engineering.	oct 2024	b.sc.	on campus	year		clr93axgc004b8usddaaxbcc3	3725	6	87	3	jul 2024	EN	{Full-time}
clr93bga5007s8usddrz92lzw	english studies with spanish	the english studies with spanish at english studies at swps university of social sciences and humanities are taught at a higher level of competency and include linguistics, intensive language development, as well as cultural and historical background of the english speaking countries.	oct 2024	b.a.	on campus	year		clr93ay9e004u8usd4l8b69i5	2815	6	72	3	sep 2024	PL	{Full-time}
clr93bghj007t8usd0nhj94i3	sustainabilty management	the aim of our sustainability management bsc programme at maria curie-sklodowska university is to prepare sustainability specialists, managers and experts, successfully implement solutions that help to achieve business and social development goals without depletion of natural resources.	oct 2024	b.a.	on campus	year		clr93ay5g004s8usd3ge09dlb	3000	\N	87	3	sep 2024	EN	{Full-time}
clr93bgox007u8usd0dkehc56	civil engineering	civil engineering is offered by rzeszow university of technology and it allows incoming and outgoing students to continue their studies in different countries and at different educational levels.	feb 2024	b.sc.	on campus	year		clr93ayau004v8usdaqiff94y	3788	\N	87	3.5	feb 2024	EN	{Full-time}
clr93bgwi007v8usd9qvgfnnz	business informatics	the main goal of the business informatics programme from wroclaw university of economics is to deliver basic knowledge about applying computer science methods and tools in management and business.	oct 2024	bachelor	on campus	year		clr93aycc004w8usdekv7fcfs	2500	5.5	75	3	aug 2024	EN	{Full-time}
clr93bh3o007w8usddfdnh5q5	applied informatics	the main objective of this applied informatics programme at cracow university of economics is to deliver it knowledge and specific skills needed for effective information systems management in a fast changing world.	oct 2024	b.sc.	on campus	year		clr93axks004e8usd1eynfw11	2382	6	\N	3	jul 2024	EN	{Full-time}
clr93bhat007x8usd388i2qni	english - literature and culture	english - literature and culture from adam mickiewicz university poznan is an interdisciplinary program concentrating on various forms of culture and cultural phenomena.	oct 2024	b.a.	on campus	year		clr93axts004k8usd0dpkdcml	1299	\N	\N	3	jul 2024	EN	{Full-time}
clr93bhi8007y8usdbygx7vt1	computer science specialization - computer science in english	computer science specialization - computer science in english  from university of lodz encompasses software engineering, computer networks, programming, internet portals, computer graphics and artificial intelligence.	oct 2024	bachelor	on campus	year		clr93axhy004c8usddk0b0jql	2130	6.5	87	3	jul 2024	EN	{Full-time}
clr93bhq3007z8usd0zhc8qvv	biotechnology	the aim of the biotechnology course at university of wroclaw is acquiring basic knowledge of the molecular basis of biological phenomena and processes through learning mathematics, statistics, chemistry, physics, as well as molecular biology, genetics, microbiology, biology of the cell and biotechnology.	oct 2024	b.sc.	on campus	year		clr93awzf00408usd5umk1e89	3000	6	72	3	jul 2024	EN	{Full-time}
clr93bhx800808usdflx8bm5h	transport	graduates of the transport programme at the silesian university of technology have education in the field of modern transport functioning, concerning in particular transport means engineering, traffic engineering and transport systems’ analysis.	oct 2024	b.sc.	on campus	year		clr93axns004g8usd0l0p3hhe	1800	6	87	3.5	jul 2024	EN	{Full-time}
clr93bi4e00818usdcer7axgj	management - digital marketing and sales management	you will learn about the principles of functioning of various organizations (enterprises and public institutions). learn more with the management - digital marketing and sales management programme from academy of business in dabrowa górnicza.	oct 2024	b.sc.	on campus	year		clr93axzm004o8usd0qaz5pfa	1698	\N	\N	3	unknown	EN	{Full-time}
clr93bibe00828usdd4fe56cx	european studies	jagiellonian university's first-cycle programme (equivalent of ba programme) in european studies gives students core knowledge of european politics, culture and society, whilst emphasizing europe’s role in a wider global framework.	oct 2024	bachelor	on campus	year		clr93axjc004d8usddjosbvvz	4000	5.5	72	3	aug 2024	EN	{Full-time}
clr93biii00838usd77y86sgw	school of form	the school of form at english studies at swps university of social sciences and humanities combines practical skills, honed in our workshops, with theoretical background and tools of social sciences and humanities.	oct 2024	b.a.	on campus	year		clr93ay9e004u8usd4l8b69i5	6500	6	72	4	sep 2024	EN	{Full-time}
clr93bipd00848usd5n0db6k7	english studies	university of warsaw's english studies major is considered part of the humanities. it encompasses courses in the fields of theoretical and applied linguistics, as well as those relating to the literature and culture of the nations of the anglosphere, among them great britain, the united states, ireland, canada, australia, the republic of south africa, and others.	oct 2024	b.a.	on campus	free		clr93ax6x00458usdfjw16d2o	0	6.5	95	3	jul 2024	EN	{Full-time}
clr93biwi00858usd97uffu09	theological studies	theological studies students from the john paul ii catholic university of lublin students can stay in cooperation with external partners.	oct 2024	bachelor	on campus	free		clr93axy6004n8usddmdm53eb	0	\N	87	2	jul 2024	EN	{Full-time}
clr93bj3v00868usdba5fhomu	business analytics	the business analytics program from maria curie-sklodowska university of the course draws on extensive use of online database available for students of the faculty of economics of umcs. to business simulations reflecting the dynamics of economic processes that will help them make decisions and observe results.	oct 2024	b.a.	on campus	year		clr93ay5g004s8usd3ge09dlb	2500	6	87	3	sep 2024	EN	{Full-time}
clr93bjaw00878usdfs5p0sif	international marketing	a new practical field of bachelor of arts in international marketing at university of lodz has been created for high school graduates with a very good command of english who aspire to build their professional careers in international companies and public organizations.	oct 2024	b.a.	on campus	year		clr93axhy004c8usddk0b0jql	2130	6	87	3	jul 2024	EN	{Full-time}
clr93bjhy00888usda3xb6vzt	management	courses in management offered by nicolaus copernicus university in torun are highly recognised in the polish academic community which is confirmed by high positions in rankings of heis.	oct 2024	bachelor	on campus	year		clr93axgc004b8usddaaxbcc3	4764	6	87	3	jul 2024	EN	{Full-time}
clr93bjp600898usda4zw68rg	philosophy	university of warsaw's international studies in philosophy (isip) is a 3-year bachelor’s degree programme taught entirely in english which took off in october 2007. all tutorials, lectures, seminars, and exams take place in english. the teaching staff are young, well-prepared and have a wealth of teaching experience both within poland and in other countries.	oct 2024	b.a.	on campus	free		clr93ax6x00458usdfjw16d2o	0	5.5	72	3	jul 2024	EN	{Full-time}
clr93bjwt008a8usd0amn09hh	european cultures	the undergraduate european cultures program at university of wroclaw aims at equipping students with both theoretical knowledge about the past and origins of european cultures and conceptual tools to analyse cultural phenomena of nowadays societies.	oct 2024	b.sc.	on campus	year		clr93awzf00408usd5umk1e89	2200	6	72	3	aug 2024	EN	{Full-time}
clr93bk3z008b8usdeiz10tez	medicine	the medicine programme at the medical university of białystok offers superior teaching quality delivered by our qualified and competent staff, a well-equipped research and teaching base, and state-of-the-art facilities including 2 teaching hospitals and 8 research units, such as the clinical research centre, experimental medicine centre, innovation research centre or centre for medical simulation	oct 2024	bachelor	on campus	year		clr93ayds004x8usdf3jd26tc	13500	\N	\N	6	unknown	EN	{Full-time}
clr93bkix008d8usdf57qfaf8	tourism management	tourism management from maria curie-sklodowska university is attractive due to various career prospects it offers. in general, it aims at preparation of graduates for services in tourism sector which is one of the most rapidly developing branches in the world economy.	oct 2024	b.a.	on campus	year		clr93ay5g004s8usd3ge09dlb	2200	6	87	3	sep 2024	EN	{Full-time}
clr93bkqc008e8usd1hprdzla	informatics	the program in informatics from the silesian university of technology is made up of courses that give students the knowledge and skills necessary to design computer systems and applications including industrial computer systems, microprocessor,s and embedded systems, databases.	oct 2024	b.sc.	on campus	year		clr93axns004g8usd0l0p3hhe	3200	6	87	3.5	jul 2024	EN	{Full-time}
clr93bkxk008f8usd5a1q3qh3	bioeconomy	at bioeconomy from wroclaw university of environmental and life sciences we will teach you everything. do you want to try something new at our university? when your friends were browsing social media, you preferred to create development projects? are you familiar with sustainable development and a responsible approach to business?	oct 2024	b.sc.	on campus	free		clr93aygs004z8usdhre08fj2	0	\N	\N	3.5	jul 2024	EN	{Full-time}
clr93bl4g008g8usddiy619xv	english studies	the undergraduate program in english studies at swps university of social sciences and humanities focuses on practical skills and combines several modules, such as: linguistics, intensive language learning, as well as cultural and historical background of the english speaking countries.	oct 2024	b.a.	on campus	year		clr93ay9e004u8usd4l8b69i5	2566	6	72	3	sep 2024	EN	{Full-time,Part-time}
clr93blbl008h8usdgh6f06nn	chemical and process engineering	graduate students at chemical and process engineering from rzeszow university of technology achieve marketable, interdisciplinary technical education in the broad sense of process engineering,	feb 2024	b.sc.	on campus	year		clr93ayau004v8usdaqiff94y	4952	\N	87	3.5	feb 2024	EN	{Full-time}
clr93blio008i8usdcy2n9wmh	international and political studies specialization - asian studies	asian studies is a specialization that focuses on different dimensions of social, political, economic and cultural development of asian countries. particular emphasis is placed on teaching a selected asian language – chinese or japanese. learn more with this program in international and political studies specialization - asian studies from university of lodz.	oct 2024	bachelor	on campus	year		clr93axhy004c8usddk0b0jql	2130	6	87	3	jul 2024	EN	{Full-time}
clr93blpm008j8usdeaxp4v2d	international business	the international business programme of west pomeranian business school is a 3-year bachelor programme.	oct 2024	b.sc.	on campus	year		clr93ayie00508usdbdo8e09x	1920	\N	\N	3	unknown	EN	{Full-time}
clr93blwr008k8usdbw3r8p3n	management	the graduates of the management program at university of humanities and economics in lodz acquire skills and competences in the areas of entrepreneurship and management, essential for successful launching and managing a company, an organization or an institution.	sep 2024	bachelor	online	year		clr93axs9004j8usd62sx91k2	2850	\N	\N	3	aug 2024	EN	{Full-time}
clr93bm3w008l8usd6ic5936o	engineering management	the engineering management course from poznan university of technology delivers competences not only in management, economics and law but also in engineering disciplines as well. such competences enable the graduate professional acting in the meeting of the enterprise and the customer.	oct 2024	b.sc.	on campus	year		clr93ax8b00468usd2os09yty	3032	5.5	\N	3.5	jul 2024	EN	{Full-time}
clr93bmbf008m8usd3mrb7jtm	business and languages	the business and languages program at sopot university of applied sciences, prepared in cooperation with business practices, is modeled on the programs and the educational trends offered by universities worldwide. it is a combination of business and economic studies with intensive learning of two languages.	oct 2024	bachelor	on campus	year		clr93ayl700528usd39ne33c5	2650	\N	\N	3	unknown	EN	{Full-time,Part-time}
clr93bmiq008n8usd9tnfgrd4	navigation	the navigation programme offered by the maritime university of szczecin is 100% compliant with stcw (the international convention on standards of training, certification and watchkeeping for seafarers).	oct 2024	bachelor	on campus	year		clr93aymj00538usd9y0gead6	4406	5.5	87	4	jul 2024	EN	{Full-time}
clr93bmpr008o8usd181c2l5d	international relations	the ba international relations programme from maria curie-sklodowska university offers a multidimensional study of contemporary global system. it is designed for students interested in various aspects of international and transnational relations including politics, society, security, environment and culture.	oct 2024	b.a.	on campus	year		clr93ay5g004s8usd3ge09dlb	2200	6	87	3	sep 2024	EN	{Full-time}
clr93bmwz008p8usdg7ol601e	philosophy	philosophy from the john paul ii catholic university of lublin encourages student collaboration and raises their professional qualifications through the organization of trainings, conferences, discussion meetings as well as through publications and other scholarly activities.	oct 2024	b.a.	on campus	free		clr93axy6004n8usddmdm53eb	0	6	87	3	jul 2024	EN	{Full-time}
clr93bn3z008q8usd95vo4zgw	engineering of management - quality management	the engineering of management - quality management specialization from academy of business in dabrowa górnicza allows you to acquire knowledge and skills in the field of designing, implementing and developing a quality system according to international standards, with particular emphasis on the automotive industry.	oct 2024	bachelor	on campus	year		clr93axzm004o8usd0qaz5pfa	1398	\N	\N	3.5	unknown	EN	{Full-time}
clr93bnat008r8usdbq0cbgcq	electronic and computer engineering	the electronic and computer engineering bsc programme at wroclaw university of science and technology contains all important needs and demands of the modern labor market for modern electronics. this direction combines the knowledge of traditional electronics and information technology, industrial automation and robotics.	oct 2024	b.sc.	on campus	free		clr93ayo000548usdcpx7g6t1	0	6.5	87	3.5	jul 2024	EN	{Full-time}
clr93bnhw008s8usd0qy184bz	business administration	the bachelor of science in business administration (ba) at polonia university in czestochowa aims to develop pro-active decision makers, managers and leaders for a variety of careers in business sectors in a global context.	feb 2024	b.sc.	on campus	unknown		clr93aypg00558usdfjwl1pxe	\N	\N	\N	3	jan 2024	EN	{Full-time}
clr93bnp4008t8usd65mqh41v	law in international relations and business	the degree in law in international relations and business at lazarski university is adapted to the current requirements of the labor market. it combines the main areas of public international law and eu law, as well as the political aspects of international relations. the program meets the needs and expectations of students from europe and beyond.	oct 2023	b.a.	on campus	year		clr93axb900488usd580n7wiv	4560	\N	\N	3	unknown	EN	{Full-time}
clr93bnw4008u8usd0ucs4ez2	management	​​the management ba course at warsaw school of economics (sgh) provides theoretical and practical knowledge in the field of management and related sciences concerning the nature, regularities and problems connected with the operation of an organization.	oct 2024	b.a.	on campus	year		clr93ayqt00568usd9upo9fz3	4000	6	87	3	jul 2024	EN	{Full-time}
clr93bo3k008v8usd06zdcn41	english studies	this program in english studies is offered by the institute of english studies, faculty of philology, university of lodz.	oct 2024	bachelor	on campus	year		clr93axhy004c8usddk0b0jql	2125	6	87	3	jul 2024	EN	{Full-time}
clr93boad008w8usd7w8c8gxb	management and finance	management and finance at university of lodz aims to educate specialists capable of working as middle level officers in business corporations and as assistants to top managers in various organizations, especially in business corporations.	oct 2024	b.a.	on campus	year		clr93axhy004c8usddk0b0jql	2125	6	87	3	jul 2024	EN	{Full-time}
clr93bohl008x8usd4wuu8rds	mechanics and machine design	mechanics and machine design from cracow university of technology is addressed for students who want to study contemporary problems in theoretical and applied mechanics with computer support.	oct 2024	b.sc.	on campus	year		clr93ays600578usdglhe6lu7	3500	\N	87	3.5	jul 2024	EN	{Full-time}
clr93booz008y8usdemrg31m2	it management	the it management programme at lazarski university will give you all the information and abilities you need for a successful start on the job market in the it industry. this is currently the most significant area of computer science, and it has several employment opportunities across numerous industries.	oct 2023	bachelor	on campus	year		clr93axb900488usd580n7wiv	5040	\N	\N	3	unknown	EN	{Full-time}
clr93bovw008z8usdcdrh4z1s	computer science	the aim of the studies in computer science at university of humanities and economics in lodz is to prepare modern and comprehensively educated specialists.	sep 2024	b.eng.	online	year		clr93axs9004j8usd62sx91k2	3000	\N	\N	3.5	aug 2024	EN	{Full-time}
clr93bp3a00908usdcmg1bsvy	english studies with chinese	the english studies with chinese at english studies at swps university of social sciences and humanities are taught at a higher level of competency and include linguistics, intensive language development, as well as cultural and historical background of the english speaking countries.	oct 2024	b.a.	on campus	year		clr93ay9e004u8usd4l8b69i5	2808	6	72	3	sep 2024	PL	{Full-time}
clr93bpai00918usda29v6rrh	management	management program from rzeszow university of technology was created pursuant to the decision of the minister of national education on 3 august 1993. first students were enrolled for the academic year 1993/1994.	feb 2024	b.sc.	on campus	year		clr93ayau004v8usdaqiff94y	2744	\N	87	3	feb 2024	EN	{Full-time}
clr93bphm00928usde8n5bpql	quantitative methods in economics and information systems	​the quantitative methods in economics and information systems ba course at warsaw school of economics (sgh) provide basic knowledge in the field of economics, management and finance as well as the canon of knowledge related to quantitative methods in economics and information systems.	oct 2024	b.a.	on campus	year		clr93ayqt00568usd9upo9fz3	4000	6	87	3	jul 2024	EN	{Full-time}
clr93bpq300938usdckgd2osg	business management	this bachelor of arts in business management at university of lodz is a comprehensive programme designed to suit the needs of future management support specialists.	oct 2024	b.a.	on campus	year		clr93axhy004c8usddk0b0jql	2125	6	87	3	jul 2024	EN	{Full-time}
clr93bpxn00948usd715d20ey	international relations and european studies (double degree)	the course curriculum at lazarski university in the field of international relations and european studies (double degree) is adapted to the contemporary requirements of the labour market.	oct 2023	bachelor	on campus	year		clr93axb900488usd580n7wiv	5640	5.5	87	3	unknown	EN	{Full-time}
clr93bq4q00958usdck1i0ta4	marketing management	the marketing management program at lazarski university that aims to develop a modern and practical approach to marketing and graduate the professionals who will both know the theoretical essential basics as well as modern approach, tools and trends.	oct 2023	b.a.	on campus	year		clr93axb900488usd580n7wiv	5040	\N	\N	3	unknown	EN	{Full-time}
clr93bqbs00968usd1s1q7unl	international business	international business of university of economy requires the employment of highly qualified staff having knowledge and practical skills relating to the area of foreign trade economics, law, international finance, international banking, international transportation and logistics.	oct 2024	b.a.	on campus	year		clr93aytk00588usd264sgvoh	2760	\N	\N	3	nov 2023	EN	{Full-time}
clr93bqj700978usddrbk8y0q	food technology and human nutrition	the food technology and human nutrition program from university of life sciences in lublin has a long lasting tradition in specialized teaching of subjects concerning horse breeding and use. the teaching staff  consists of experienced professionals.	oct 2024	b.eng.	on campus	year		clr93axqs004i8usddu4je3la	3900	\N	\N	3.5	jun 2024	EN	{Full-time}
clr93bqqe00988usd7drcer77	business and technology	graduates of the business and technology program are well-trained in economics, management and marketing. lodz university of technology offers a degree in business and technology. it is worth studying among people who develop their passions, are successful and create innovations. remember that this is the place where you can spread your wings!	oct 2024	bachelor	on campus	year		clr93axcw00498usd64zu1pr9	3408	6	87	4	jan 2024	EN	{Full-time}
clr93bqxk00998usda2jqb94j	dietetics	health and rational nutrition are not only fashion, but an authentic, steadily growing need witnessed in contemporary society. learn more with the dietetics programme from vistula university.	oct 2024	b.a.	on campus	year		clr93awtf003w8usd6nuw9zz0	2500	\N	87	3	aug 2024	PL	{Full-time,Part-time}
clr93br4q009a8usdd1015blt	international business	the international business programme from wroclaw university of economics gives students an overview of the different aspects of international markets and cross-border business transactions.	oct 2024	bachelor	on campus	year		clr93aycc004w8usdekv7fcfs	2500	5.5	75	3	aug 2024	EN	{Full-time}
clr93brbq009b8usdfny70pp9	finance, international investment and accounting	the finance, international investment, and accounting programme at university of warsaw is designed to equip students with professional knowledge of the economic processes and instruments in international financial markets.	oct 2024	b.a.	on campus	year		clr93ax6x00458usdfjw16d2o	2200	\N	75	3	jul 2024	EN	{Full-time,Part-time}
clr93brin009c8usd9f1kdb42	applied anthropology	graduates of the applied anthropology from the john paul ii catholic university of lublin are creative, open and critical; understand the ways of functioning of different perspectives of perceiving reality, prepare projects to implement the planned goal.	oct 2024	b.a.	on campus	free		clr93axy6004n8usddmdm53eb	0	6	87	3	jul 2024	EN	{Full-time}
clr93brpz009d8usd0grccolx	nursing	nursing from medical university of lublin meets national and eu standards and requirements of medical education. the candidates can apply for admission to the 3-year undergraduate programme where they will acquire knowledge and skills that will allow them to work in a variety of health care settings.	oct 2024	bachelor	on campus	year		clr93ay2k004q8usdas499gmq	12600	\N	\N	3	unknown	EN	{Full-time}
clr93brwz009e8usdaewsc22w	sustainable building engineering	the graduate of the sustainable building engineering from poznan university of technology will be capable of solving complex problems in civil engineering, with practical application of computer-aided design, including bim (building information modelling) technology.	oct 2024	b.sc.	on campus	year		clr93ax8b00468usd2os09yty	3024	5.5	\N	3.5	jul 2024	EN	{Full-time}
clr93bs4g009f8usdhranbtzn	political science	undergraduate programme in political science is addressed primarily to the high school graduates. the programme is fee-paying. the language is english. university of warsaw's political science courses within the studies are both theoretical (aimed at developing the theoretical knowledge of political science issues) and practical, including courses preparing students to do research.	oct 2024	b.a.	on campus	year		clr93ax6x00458usdfjw16d2o	3400	5.5	72	3	sep 2024	EN	{Full-time}
clr93bsbk009g8usdfpz3fa1c	mechatronic engineering	mechatronic engineering from agh university of science & technology is an interdisciplinary program composed of basic courses (e.g. mathematics, physics), major courses (e.g. mechanics, control theory, computer science, electronics), and speciality courses.	oct 2024	b.eng.	on campus	year		clr93axme004f8usdeflj0rxo	3450	\N	87	3.5	sep 2024	EN	{Full-time}
clr93bsin009h8usd4s9u5khf	economics	the course curriculum in the field of economics at lazarski university is adapted to the contemporary requirements of the labour market.	oct 2023	bachelor	on campus	year		clr93axb900488usd580n7wiv	4560	5.5	87	3	unknown	EN	{Full-time}
clr93bspo009i8usd0y9c9k2s	food science - technology and nutrition	the bachelor programme of food science - technology and nutrition from warsaw university of life sciences has the aim to provide students with the most up-to-date knowledge and skills in the field of food technology, food processing and nutrition.	oct 2024	bachelor	on campus	year		clr93axea004a8usd10l9492g	1896	\N	72	3	jul 2024	EN	{Full-time}
clr93bswv009j8usd28w1dvp0	international business	the international business programme at cracow university of economics is intended for candidates interested in economic, political and social relations in the spheres of the global economy, foreign trade, international business management and the european union.	oct 2024	bachelor	on campus	year		clr93axks004e8usd1eynfw11	2376	6	\N	3	jul 2024	EN	{Full-time,Part-time}
clr93bt46009k8usd0mhq3gdu	management	management at the university of  economics and innovation in lublin is a faculty, whose graduates are equipped with knowledge of the theoretical and practical aspects of the functioning of modern enterprises, economic and administrative, national and international institutions. they gain the ability to direct organizations in all their areas.	oct 2024	bachelor	on campus	year		clr93ax9t00478usd9hlwcy7j	2000	\N	\N	3	jul 2024	EN	{Full-time}
clr93btbh009l8usd8jqw5w08	culture, thought and humanity	the studies in the english-language culture, thought and humanity bachelor's degree program from university of wroclaw introduce in-depth philosophical reflection on culture, revealing both the fundamental underlying structures and the related diverse dimensions and aspects of culture.	oct 2024	bachelor	on campus	year		clr93awzf00408usd5umk1e89	2300	\N	72	3	aug 2024	EN	{Full-time}
clr93btin009m8usd8qw4e6ee	chemical technology	the chemical technology study from poznan university of technology course was created for students, who wish to become a bridge between chemists and engineers, combining their skills with an interdisciplinary perspective on industrial processes.	oct 2024	b.sc.	on campus	year		clr93ax8b00468usd2os09yty	3024	5.5	\N	3.5	jul 2024	EN	{Full-time}
clr93btpt009n8usd7phr7acx	mechatronics	mechatronics program is offered by rzeszow university of technology. one of the greatest advantages of the university is its excellent didactic and scientific staff.	feb 2024	b.sc.	on campus	year		clr93ayau004v8usdaqiff94y	4222	\N	87	3.5	feb 2024	EN	{Full-time}
clr93btwu009o8usd470mhqil	biomedical engineering and technologies	lodz university of technology offers a degree in biomedical engineering and technologies. each student at the international faculty of engineering, as part of the curriculum, completes at least one semester (6th semester) - "mobility semester" - in a foreign university.	oct 2024	bachelor	on campus	year		clr93axcw00498usd64zu1pr9	3408	6	87	3.5	jan 2024	EN	{Full-time}
clr93bu4g009p8usdc60110np	environmental engineering	the environmental engineering program at university of warmia and mazury in olsztyn focuses on problems related to environmental engineering and sustainable development.	oct 2024	b.sc.	on campus	free		clr93ayv100598usdcmkufa9w	0	\N	\N	3.5	jul 2024	EN	{Full-time}
clr93caav00bx8usd12u5d5w5	data engineering	making important decisions is always based on collecting and analyzing vast amounts of information. the data engineering degree is offered at gdansk university of technology.	oct 2024	b.sc.	on campus	year		clr93axp8004h8usdd1gfcdoj	3715	\N	72	3.5	sep 2024	EN	{Full-time}
clr93bubi009q8usd9xc1fos3	global studies	globalization, global problems, globalistics, global education. many synonymous notions, and yet each of them has its own specificity. the global studies major at university of opole is a unique degree, as it combines a large dose of practical experience, gained by our experts during numerous worldwide research expeditions, with academic knowledge.	oct 2024	b.a.	on campus	year		clr93aywg005a8usd1jz73tas	1555	\N	87	3	jul 2024	EN	{Full-time}
clr93buiz009r8usd6uy00tza	informatics	ba in informatics at the john paul ii catholic university of lublin equips students for using for professional purposes a general knowledge of information technology and specialist knowledge of the chosen specialization: programming and information processing, computer graphics and multimedia	oct 2024	b.a.	on campus	free		clr93axy6004n8usddmdm53eb	0	6	87	3	jul 2024	EN	{Full-time}
clr93buq3009s8usd5hbyejw0	data science	the data science degree at lazarski university is a unique study programme tailored for ai revolution. most bachelor level data science courses offered in poland are very technical and omit modern approaches to working with data, including machine learning and state-of-the-art tools like python and r, which are must-have languages in data science.	oct 2023	bachelor	on campus	year		clr93axb900488usd580n7wiv	5640	\N	\N	3	unknown	EN	{Full-time}
clr93bux8009t8usd23gi0sis	international economics	the international economics ba course at warsaw school of economics (sgh) provides the knowledge and develop the skills necessary to start a career in the central and local government administration as well as public institutions and ngos operating internationally.	oct 2024	b.a.	on campus	year		clr93ayqt00568usd9upo9fz3	4000	6	87	3	jul 2024	EN	{Full-time}
clr93bv4k009u8usd1m9yfbpk	materials design and logistics	czestochowa university of technology offers the bachelor of science in materials design and logistics.	oct 2024	b.sc.	on campus	year		clr93ayxv005b8usd3k5w3fb4	1920	\N	\N	3.5	jul 2024	EN	{Full-time}
clr93bvbr009v8usd9z14007l	dental surgery	the 5-year long doctor of dental surgery program (dds) at jagiellonian university is tailored for international candidates who have graduated from high school/secondary school, have obtained grades in biology (or physics) and chemistry, and possess good working knowledge of english language.	oct 2024	bachelor	on campus	year		clr93axjc004d8usddjosbvvz	15100	\N	87	5	may 2024	EN	{Full-time}
clr93bvj9009w8usdgvz823om	management and leadership	the management and leadership at english studies at swps university of social sciences and humanities includes carefully selected subjects without any unnecessary components. we believe in active learning through experience and experimentation. students learn through workshops, group projects, discussions, debates and simulations.	oct 2024	b.a.	on campus	year		clr93ay9e004u8usd4l8b69i5	1112	6	72	3	sep 2024	EN	{Full-time}
clr93bvqi009x8usd116z2z9q	nursing	students in the nursing of university of economy are given internships in public health care institutions, non-public health care institutions, hospitals, nursing homes, private medical centers, medical clinics of a nature consistent with the internship program.	oct 2024	b.a.	on campus	year		clr93aytk00588usd264sgvoh	4020	\N	\N	3	nov 2023	EN	{Full-time}
clr93bvxh009y8usdhudre5gw	english in public communication	the english in public communication ba programme at university of opole is an excellent opportunity for the students who would like to be able to face challenges of a highly competitive job market in an increasingly global society.	oct 2024	b.a.	on campus	year		clr93aywg005a8usd1jz73tas	1123	\N	87	3	jul 2024	EN	{Full-time}
clr93bw5a009z8usd0833fh40	english studies with korean	the english studies with korean at english studies at swps university of social sciences and humanities are taught at a higher level of competency and include linguistics, intensive language development, as well as cultural and historical background of the english speaking countries.	oct 2024	b.a.	on campus	year		clr93ay9e004u8usd4l8b69i5	2808	6	72	3	sep 2024	PL	{Full-time}
clr93bwcl00a08usd76upfbzn	landscape architecture	landscape architecture from cracow university of technology offers comprehensive education in the field of natural, agricultural, technical and social sciences, all combined with fine arts. it also teaches the skill of using it in your professional practice while observing the provisions of law and principles of ethics.	oct 2024	b.a.	on campus	year		clr93ays600578usdglhe6lu7	5000	\N	87	4	jul 2024	EN	{Full-time}
clr93bwjg00a18usd3t0r4qg6	pharmacy	the medical university of warsaw offers a bachelor's degree in pharmacy, being one of the best places in poland to study dentistry and medical sciences	oct 2024	bachelor	on campus	year		clr93ayfa004y8usd14noeh1t	13700	6.5	87	5	jun 2024	EN	{Full-time}
clr93bwqk00a28usd4z1j1uyn	english studies with german	the english studies with german at english studies at swps university of social sciences and humanities are taught at a higher level of competency and include linguistics, intensive language development, as well as cultural and historical background of the english speaking countries.	oct 2024	b.a.	on campus	year		clr93ay9e004u8usd4l8b69i5	2808	6	72	3	sep 2024	EN	{Full-time}
clr93bwxz00a38usd1cbg6vqj	international and political studies specialization-politics and policy in europe	the specialty is focused on theories and practices of functioning of european states, regional and local entities of public life, selfgovernment, economic and political entities, non-governmental organizations. learn more about this program in international and political studies specialization-politics and policy in europe from university of lodz.	oct 2024	bachelor	on campus	year		clr93axhy004c8usddk0b0jql	2125	6	87	3	jul 2024	EN	{Full-time}
clr93bx5300a48usd6z9m2wtv	economics - international business	the economics - international business degree at university of opole provides specific knowledge, tools and experience required to become a successful international business leader.	oct 2024	b.sc.	on campus	year		clr93aywg005a8usd1jz73tas	1555	\N	\N	3	jul 2024	EN	{Full-time}
clr93bxcc00a58usddnl7b30y	mathematics	the mathematics graduates from rzeszow university of technology and it uses it tools to solve theoretical and applied mathematical problems.	feb 2024	b.sc.	on campus	year		clr93ayau004v8usdaqiff94y	4256	\N	87	3	feb 2024	EN	{Full-time}
clr93bxjk00a68usd47zd3cd0	cultural communication	cultural communication from university of gdansk is a good choice for those wishing to develop knowledge and skills in the field of information flow and management in the sphere of language(s), literature, arts, media and culture.	oct 2024	bachelor	on campus	year		clr93axv8004l8usdgp9r0o1u	1490	\N	87	3	sep 2024	EN	{Full-time}
clr93bxqm00a78usd7yn8b31f	dental medicine	the medical university of warsaw offers a bachelor's degree in dental medicine, being one of the best places in poland to study dentistry and medical sciences	oct 2024	bachelor	on campus	year		clr93ayfa004y8usd14noeh1t	13700	6.5	87	5	jun 2024	EN	{Full-time}
clr93bxxm00a88usd462l5tq6	financial mathematics	a graduate of mathematics with a specialization in financial mathematics from university of lodz  is familiar with basic statistical methods, the fundamentals of microeconomics and insurance learn more about this program in financial mathematics from university of lodz.	oct 2024	bachelor	on campus	year		clr93axhy004c8usddk0b0jql	2125	6	87	3	jul 2024	EN	{Full-time}
clr93by5100a98usd753h0yia	biotechnology	graduate students at biotechnology from rzeszow university of technology are prepared to apply standard biotechnological techniques enabling selection and directed modification of microorganisms and higher organisms’ cells.	feb 2024	b.sc.	on campus	year		clr93ayau004v8usdaqiff94y	4602	\N	87	3.5	feb 2024	EN	{Full-time}
clr93bycb00aa8usdhetgc3dn	psychology	the psychology at english studies at swps university of social sciences and humanities includes courses that allow students to develop a deep understanding of core areas in psychology, including social psychology, cognitive psychology, personality psychology, psychology of emotion and motivation, and psychology of individual differences.	oct 2024	b.a.	on campus	year		clr93ay9e004u8usd4l8b69i5	1318	6	72	3	sep 2024	EN	{Full-time}
clr93byjl00ab8usddwi7f16t	nursing	nursing at the university of economics and innovation in lublin: the modern world, a world of patients and medical professionals is changing. this concerns the professional work of nurses, needs in the area of nursing and expectations of patients regarding this profession; the education system of this group of professionals is also changing.	oct 2024	bachelor	on campus	year		clr93ax9t00478usd9hlwcy7j	3000	\N	\N	3	jul 2024	EN	{Full-time}
clr93byqn00ac8usd6q9842vh	global business, finance and governance	the global business, finance and governance ba course at warsaw school of economics (sgh) provides the knowledge and develop the skills necessary for work in international business and finance environment with its unique set of issues and challenges.	oct 2024	b.a.	on campus	year		clr93ayqt00568usd9upo9fz3	4000	6	87	3	jul 2024	EN	{Full-time}
clr93byy300ad8usdbsg47oko	mechanical engineering	this mechanical engineering bsc programme at wroclaw university of science and technology prepares the graduates for creative engineering work in machine design, machine operation and manufacturing processes. the student will be familiarwith fundamental methods, techniques, tools and materials used for solving engineering tasks in the field of mechanical engineering.	oct 2024	b.sc.	on campus	free		clr93ayo000548usdcpx7g6t1	0	6.5	87	3.5	jul 2024	EN	{Full-time}
clr93bz5800ae8usd5txw7frv	chemistry	adam mickiewicz university poznan's chemistry bs program is a comprehensive academic offering designed to provide students with a strong foundation in the field of chemistry, preparing them for a successful career in this dynamic and ever-evolving discipline.	oct 2024	b.sc.	on campus	year		clr93axts004k8usd0dpkdcml	648	\N	\N	3	jul 2024	EN	{Full-time}
clr93bzcp00af8usd3l1eefbs	tourism and recreation	tourism and recreation are among the fastest developing sectors of global economy. after the pandemic-related perturbations, they have returned on the path of dynamic growth. employees with relevant education are today sought and very well remunerated. learn more at the vistula university.	feb 2024	b.a.	on campus	year		clr93awtf003w8usd6nuw9zz0	2500	\N	87	3	jan 2024	PL	{Full-time,Part-time}
clr93bzk800ag8usd4ziv6jz6	foundation year	sopot university of applied sciences offers foundation year for students who are not eligible to directly enroll for direct entry into our undergraduate degrees.	feb 2024	pre-bachelor	on campus	year		clr93ayl700528usd39ne33c5	1900	\N	\N	1	unknown	EN	{Full-time}
clr93bzrs00ah8usdbk27gfqe	applied computer science	the applied computer science bsc programme at wroclaw university of science and technology emphasizes practical aspects of computer engineering and can be adapted to the student’s interest. the final effect of studies is obtaining of first level competences knowledge, skills and qualifications in accordance with “teaching standards” in the field of computer science.	oct 2024	b.sc.	on campus	free		clr93ayo000548usdcpx7g6t1	0	6.5	87	3.5	jul 2024	EN	{Full-time}
clr93bzyw00ai8usd9bnifzim	food processing, safety and quality	the bachelor in food processing, safety and quality is offered at university of agriculture in krakow.	oct 2024	bachelor	on campus	free		clr93ayza005c8usdbv967hzx	0	\N	72	3.5	jul 2024	EN	{Full-time}
clr93c06000aj8usdccm23bsv	advanced biobased and bioinspired materials	lodz university of technology offers a degree in advanced biobased and bioinspired materials. each student pursuing a degree in advanced biobased and bioinspired materials completes at least one semester abroad as part of their programme of study (the 6th semester, called the mobility semester).	oct 2024	bachelor	on campus	year		clr93axcw00498usd64zu1pr9	3408	6	87	4	jan 2024	EN	{Full-time}
clr93c0d500ak8usd18ai49dh	logistics	logistics is an important element of modern economic life. it allows the free flow of materials, raw materials in the course of production, all types of cargo, passenger and freight traffic and tourism. the purpose of education at the university of economics and innovation in lublin is to learn the basic logistical tasks that support modern management in a production enterprise.	oct 2024	b.eng.	on campus	year		clr93ax9t00478usd9hlwcy7j	2500	\N	\N	3.5	jul 2024	EN	{Full-time}
clr93c0kp00al8usde8w73359	international business	international business is offered by university of economics in katowice. it is a program which offers you a unique opportunity to study business in the international context, with a solid grounding in economics, law, finance and management. you will get familiar with the contemporary issues in the global economy and the conditions of conducting international business operations.	oct 2024	bachelor	on campus	year		clr93axwo004m8usd5ljm58bp	1166	5.5	87	3	apr 2024	EN	{Full-time}
clr93c0s000am8usdg50f7ayh	civil engineering	civil engineering from cracow university of technology is aimed at educating future engineers who will not only gain expertise in the field of modern building industry, but also master fluency in technical english, so necessary in today's labor market.	oct 2024	b.sc.	on campus	year		clr93ays600578usdglhe6lu7	3000	\N	87	3.5	jul 2024	EN	{Full-time}
clr93c0z600an8usd8s4106zz	quality and production management	czestochowa university of technology offers the bachelor of science in quality and production management.	feb 2024	b.sc.	on campus	year		clr93ayxv005b8usd3k5w3fb4	1920	\N	\N	3.5	nov 2023	EN	{Full-time}
clr93c16400ao8usdesfs0w9q	industrial biotechnology	lodz university of technology offers a degree in industrial biotechnology. graduates with a degree in industrial biotechnology work in research institutions in poland and abroad.	oct 2024	bachelor	on campus	year		clr93axcw00498usd64zu1pr9	3408	6	87	3.5	jan 2024	EN	{Full-time}
clr93c1f000ap8usdabuv7g7e	english philology	if you want to be well prepared to face the challenges of a highly competitive job market, study english philology – practical profile of the undergraduate studies in english at university of opole.	oct 2024	b.a.	on campus	free		clr93aywg005a8usd1jz73tas	0	\N	87	3	jul 2024	EN	{Full-time}
clr93c1mb00aq8usd30xfdcw8	financial management	the financial management degree at lazarski university is a platform where you will gain the skills necessary to operate in complex work environments. students will learn the basics of organisational, financial, accounting and consulting, and will build the foundation necessary to launch successful and meaningful careers.	oct 2023	b.a.	on campus	year		clr93axb900488usd580n7wiv	5040	\N	\N	3	unknown	EN	{Full-time}
clr93c1tp00ar8usd5qrxhb62	computer engineering and mechatronics	a graduate of the computer engineering and mechatronics of university of economy studies has specialist knowledge and general knowledge in the field of mechatronics, which will allow him to further education and self-education in selected areas related to engineering activities.	oct 2024	b.eng.	on campus	year		clr93aytk00588usd264sgvoh	3360	\N	\N	3.5	nov 2023	EN	{Full-time}
clr93c20r00as8usdb9qnhms5	english linguistics - theories, interfaces, technologies	at english linguistics - theories, interfaces, technologies from adam mickiewicz university poznan you may take advantage of supplementary training and internships in private companies.	oct 2024	b.a.	on campus	year		clr93axts004k8usd0dpkdcml	1296	\N	\N	3	jul 2024	EN	{Full-time}
clr93c28b00at8usdd7ioc8cv	business administration	bachelor in business administration (bba) programme offered at the poznan university of economics and business (pueb) provides students with unparalleled knowledge and competence in making economic and business decisions in globalized world and managing different organizations across national boundaries and diverse cultures.	oct 2024	b.b.a.	on campus	year		clr93ay3y004r8usd4nbq5yse	2480	\N	70	3	unknown	EN	{Full-time}
clr93c2ff00au8usddji1gyut	management and production engineering	the management and production engineering program from university of life sciences in lublin has a long lasting tradition in specialized teaching of subjects concerning horse breeding and use. the teaching staff  consists of experienced professionals.	oct 2024	b.eng.	on campus	year		clr93axqs004i8usddu4je3la	2300	\N	\N	3.5	jun 2024	EN	{Full-time}
clr93c2mv00av8usd6n95fitl	control, electronics, and information engineering (ceie)	the control, electronics, and information engineering (ceie) program from the silesian university of technology matches the standards of technical universities in european countries.	oct 2024	b.sc.	on campus	year		clr93axns004g8usd0l0p3hhe	3200	6.5	87	3.5	jul 2024	EN	{Full-time}
clr93c2u900aw8usd4acx82px	electrical engineering	electrical engineering from rzeszow university of technology is the field that implements and applies principles of electrical engineering.	feb 2024	b.sc.	on campus	year		clr93ayau004v8usdaqiff94y	4682	\N	\N	3.5	feb 2024	EN	{Full-time}
clr93c31g00ax8usdduvzaonj	management and finance	the study programme described herein leads to an award of a ba in management and finance. learn more about this program in management and finance from university of lodz.	oct 2024	bachelor	on campus	year		clr93axhy004c8usddk0b0jql	2125	6.5	87	3	jul 2024	EN	{Full-time}
clr93c38k00ay8usd9b2he5yq	polish studies with english	polish studies with english from university of lodz is intended for students with no knowledge of the polish language as well as a basic competence in the language.	oct 2024	b.a.	on campus	year		clr93axhy004c8usddk0b0jql	2125	6	87	3	jul 2024	PL	{Full-time}
clr93c3fr00az8usd7om6cz2t	european politics and economics	university of warsaw's european politics and economics is conducted in english and is open to all international and polish applicants. the specialisation is a part of first-cycle (six semesters), full-time european studies – european integration program.	oct 2024	b.a.	on campus	year		clr93ax6x00458usdfjw16d2o	3400	5.5	72	3	jul 2024	EN	{Full-time}
clr93c3mu00b08usdefiwdzdu	architecture	architecture from cracow university of technology comprises 8 semesters and follows the newest architectural education standards. it has  earned - as the only one in poland -  two international accreditations: the royal institute of british architects and the european union notification.	oct 2024	b.a.	on campus	year		clr93ays600578usdglhe6lu7	5000	\N	87	4	jul 2024	EN	{Full-time}
clr93c3u700b18usd1ma1eccm	english studies with japanese	the english studies with japanese at english studies at swps university of social sciences and humanities are taught at a higher level of competency and include linguistics, intensive language development, as well as cultural and historical background of the english speaking countries.	oct 2024	bachelor	on campus	year		clr93ay9e004u8usd4l8b69i5	2808	6	72	3	sep 2024	PL	{Full-time}
clr93c41j00b28usd6j2ahv6a	liberal arts and sciences	adam mickiewicz university poznan's liberal arts and sciences ba program offers a diverse and interdisciplinary education, enabling students to explore a wide range of subjects and develop critical thinking skills, all within a dynamic academic environment.	oct 2024	b.a.	on campus	year		clr93axts004k8usd0dpkdcml	648	\N	\N	3	jul 2024	EN	{Full-time}
clr93c48l00b38usd55va4s0j	international business	bachelor degree (3 years) and master degree (2 years) in international business at university of gdansk are one of a kind and will give their participants access to exceptional knowledge and expertise about strategic and global business management, marketing, financial issues as well as specific insights into business system.	oct 2024	b.a.	on campus	year		clr93axv8004l8usdgp9r0o1u	1555	5.5	87	3	jul 2024	EN	{Full-time}
clr93c4fx00b48usdbx9v3df7	computer science	the first stage of education at the faculty of information technology of polish-japanese academy of information technology comprises undergraduate studies offered in three modes: full-time (day) - three and a half years (studies in pl or in eng); part-time (weekend) - four years (studies in pl); part-time online - four years (studies in pl or in eng).	oct 2024	b.sc.	online, on campus	module		clr93az0w005d8usd1q6hffso	518	6.5	90	3.5	may 2024	EN	{Full-time,Part-time}
clr93c4n600b58usdc19reb15	applied medical science	applied medical science of university of economy it's three-year undergraduate studies, which enable preparation for continuing medical professional (education, rescue, physiotherapy, dietetics, medicine, dentistry), as well as methodological preparation for conducting scientific research in the field of health and medicine.	oct 2024	b.a.	on campus	year		clr93aytk00588usd264sgvoh	4020	\N	\N	3	nov 2023	EN	{Full-time}
clr93c4um00b68usde55u9vxh	international and political studies specialization: intercultural communication	the program of specialty allows to obtain interdisciplinary humanistic education and prepare the student for second degree studies. learn more with this program in international and political studies specialization: intercultural communication from university of lodz.	oct 2024	bachelor	on campus	year		clr93axhy004c8usddk0b0jql	2125	6.5	87	3	jul 2024	EN	{Full-time}
clr93c52n00b78usdgqebee36	economics	the three-year undergraduate bachelor of arts in economics at university of lodz is intended to provide students with tools that will allow them to describe and analyze economic and social reality.	oct 2024	bachelor	on campus	year		clr93axhy004c8usddk0b0jql	2125	6.5	87	3	jul 2024	EN	{Full-time}
clr93c59x00b88usddcclhowj	psychology	the psychology at english studies at swps university of social sciences and humanities includes courses on the core aspects of psychology, such as emotions, motivation, cognition, personality, and individual differences.	oct 2024	b.a.	on campus	year		clr93ay9e004u8usd4l8b69i5	1318	6	72	3	sep 2024	EN	{Full-time}
clr93c5h400b98usd3bfmcsju	technical physics	the bachelor of engineering in  technical physics  program at maria curie-sklodowska university offers three specialities  medical physics, computational physics  and  modern materials and measurement techniques  – all of them are closely related to the development of modern technologies and the education of highly qualified personnel for the medical, it, analytical and materials sectors.	oct 2024	b.eng.	on campus	year		clr93ay5g004s8usd3ge09dlb	3150	\N	87	3.5	sep 2024	EN	{Full-time}
clr93c5oe00ba8usd5ak42uqx	amu premed	the amu premed program from adam mickiewicz university poznan prepares for the entrance exam at poznań university of medical sciences (pums), a sister institution in poznań, as well as other medical programs in poland.	oct 2024	pre-bachelor	on campus	year		clr93axts004k8usd0dpkdcml	6000	\N	\N	1	sep 2024	EN	{Full-time}
clr93c5ve00bb8usdgrvvaaa1	international relations - international business, trade and marketing	if you are interested in the world around you, you are not indifferent to the political and economic situation of our globe, and the prospect of working in an international environment is an interesting challenge for you, then you should definitely become a student of the international relations - international business, trade and marketing programme from academy of business in dabrowa górnicza.	oct 2024	b.sc.	on campus	year		clr93axzm004o8usd0qaz5pfa	1698	\N	\N	3	unknown	EN	{Full-time}
clr93c62l00bc8usdaip7d9g1	mechanical engineering	lodz university of technology offers a degree in mechanical engineering. each student enrolled on a degree program at the international faculty of engineering is required to complete at least one semester of the program, usually the sixth semester (mobility semester) at a university abroad.	oct 2024	bachelor	on campus	year		clr93axcw00498usd64zu1pr9	3408	6	87	4	jan 2024	EN	{Full-time}
clr93c69t00bd8usd8xaqgeyb	medicine	wroclaw medical university is one of the best medical universities in poland. the medicine studies are adapted to the common european programme, in keeping with the european admission standards for medical education.	oct 2024	bachelor	on campus	year		clr93az2d005e8usdhwvi6796	11232	6.5	\N	6	jul 2024	EN	{Full-time}
clr93c6h600be8usd4hfcf54a	global management in smart agriculture	the global management in smart agriculture program from university of life sciences in lublin has a long lasting tradition in specialized teaching of subjects concerning horse breeding and use. the teaching staff  consists of experienced professionals.	oct 2024	b.sc.	on campus	year		clr93axqs004i8usddu4je3la	5600	\N	\N	3.5	jun 2024	EN	{Full-time}
clr93c6oa00bf8usd4hwh5s4i	agriculture	the agriculture programme of the university of agriculture in krakow helps the graduates to acquire a comprehensive knowledge in the field of agriculture and agricultural technologies, including supplementary modules, like horticultural or livestock production or economic module, which improves employment opportunities at the competitive 21st century labour market.	oct 2024	b.sc.	on campus	free		clr93ayza005c8usdbv967hzx	0	5.5	72	3.5	jul 2024	EN	{Full-time}
clr93c6vn00bg8usd60nw8iqo	management	management at gdansk university of technology is a comprehensive, practice-relevant three-year degree. it is unique in poland and spans across all spheres of business and management.	oct 2024	bachelor	on campus	year		clr93axp8004h8usdd1gfcdoj	17200	\N	72	3	sep 2024	EN	{Full-time}
clr93c72t00bh8usd8vpg18gf	business management	the business management major is offered by wroclaw university of economics. business management is an international program that focuses on all the major aspects of modern business and organization management. it provides students with a broad understanding of management practice, ensuring a general overview of the operations of business and its environment.	oct 2024	bachelor	on campus	year		clr93aycc004w8usdekv7fcfs	2500	\N	75	3	aug 2024	EN	{Full-time}
clr93c7a300bi8usdck6pbme2	nursing	if you envision yourself working in health care, this bachelor of science in nursing programme (bsn) for both men and women can be the best choice of a professional career. studies at polonia university in czestochowa provide practical education, knowledge, skills, competencies as well as the right to exercise the profession.	feb 2024	b.sc.	on campus	year		clr93aypg00558usdfjwl1pxe	3000	\N	\N	3	jan 2024	EN	{Full-time}
clr93c7gy00bj8usdgcuh8pac	international relations (with preparatory year)	these programs are designed for applicants who would like to improve their english skills from pre-intermediate to advanced level and also for those who would like to apply for our ba programs, but do not yet have the required level of english knowledge to start the chosen program. join the international relations (with preparatory year) program from academy of business in dabrowa górnicza.	oct 2024	b.sc.	on campus	year		clr93axzm004o8usd0qaz5pfa	1698	\N	\N	4	unknown	EN	{Full-time}
clr93c7o800bk8usdhmb1cvgv	electronics and telecommunication	the graduates of the electronics and telecommunication from poznan university of technology obtain knowledge in electronics, telecommunication systems, communication and computer networks, mobile communications and multimedia.	oct 2024	b.sc.	on campus	year		clr93ax8b00468usd2os09yty	3024	5.5	\N	3.5	jul 2024	EN	{Full-time}
clr93c7va00bl8usd2hvo79n7	organizational management	the organizational management bsc programme at wroclaw university of science and technology prepares students for future work as management/organization specialists, middle-level managers, to develop their own small enterprises, or for postgraduate studies.	oct 2024	b.sc.	on campus	free		clr93ayo000548usdcpx7g6t1	0	6.5	87	3	jul 2024	EN	{Full-time}
clr93c82l00bm8usdd4dse242	biomedical engineering - information systems in medicine	the biomedical engineering - information systems in medicine programme at the silesian university of technology  is a modern field of study which meets the needs of professional engineers education to face the growing level of information technologies, entering every branch of industry and life, especially health care system	oct 2024	b.sc.	on campus	year		clr93axns004g8usd0l0p3hhe	3200	6	87	3.5	jul 2024	EN	{Full-time}
clr93c89x00bn8usdc8hs9y9m	md in english	the md in english program for high school graduates at jagiellonian university is tailored for international candidates who have graduated from high school/secondary school, have obtained grades in biology (or physics) and chemistry, and possess a good working knowledge of the english language.	oct 2024	bachelor	on campus	year		clr93axjc004d8usddjosbvvz	15000	\N	87	6	may 2024	EN	{Full-time}
clr93c8gy00bo8usdamk5htt8	biotechnology	biotechnology is a multidisciplinary field of study, combining knowledge of life sciences and engineering, aiming to use the living organisms in product development, testing and manufacturing. in addition to general topics students can focus on biotechnology of plants, animals and microorganisms gaining practical and theoretical knowledge. our aim is to provide a solid foundation for future careers in food and pharmaceutical industry, diagnostics, plant breeding companies, research institutions and many others. we put special attention on cutting edge topics including bioinformatics, genomics, nanobiotechnology and genetic engineering.	oct 2024	b.eng.	on campus	year		clr93axea004a8usd10l9492g	2154	\N	72	3.5	jul 2024	EN	{Full-time}
clr93c8ob00bp8usdfwj2cwh4	european legal studies	the goal of the european legal studies programme from adam mickiewicz university poznan is not only to pass on knowledge and experience that will lead you to success.	oct 2024	b.a.	on campus	year		clr93axts004k8usd0dpkdcml	1512	\N	\N	3	jul 2024	EN	{Full-time}
clr93c8vc00bq8usdcqry3914	international relations and area studies	jagiellonian university's international relations and area studies programme is an undergraduate interdisciplinary programme that offers a rigorous international and comparative perspective on the contemporary global system and different regions of the world.	oct 2024	bachelor	on campus	year		clr93axjc004d8usddjosbvvz	4500	5.5	72	3	aug 2024	EN	{Full-time}
clr93c93600br8usd0xdr5q4y	international tourism and hospitality management	the premise of the international tourism and hospitality management of university of economy study program in the field of international tourism is to equip graduates with a range of sought labor market skills and competencies which can be easily tailored to the requirements and expectations of employers in the tourism industry.	oct 2024	b.a.	on campus	year		clr93aytk00588usd264sgvoh	2520	\N	\N	3	nov 2023	EN	{Full-time}
clr93c9a800bs8usdfd71ewr1	business studies	business studies graduates are professional staff prepared to act in economic and social life in the era of global economy. lodz university of technology offers a degree in business studies	oct 2024	bachelor	on campus	year		clr93axcw00498usd64zu1pr9	3408	6	87	3	jan 2024	EN	{Full-time}
clr93c9hk00bt8usd7vy32rtx	political science	ba political science programme at university of wroclaw will consist of six semesters: five semesters at the university of wroclaw and one semester of mobility arranged within erasmus+ at one of the partner universities abroad.	oct 2024	b.a.	on campus	year		clr93awzf00408usd5umk1e89	2300	6	72	3	aug 2024	EN	{Full-time}
clr93c9p200bu8usd3rs5huv0	international relations	university of warsaw's international relations 3-year first-cycle degree full-time programme consists of six semesters (terms) and over 20 courses plus dissertation seminar aimed at thesis preparation and individual focus. all units are taught in english by experienced american and european academic teachers.	oct 2024	b.a.	on campus	year		clr93ax6x00458usdfjw16d2o	3400	5.5	72	3	jul 2024	EN	{Full-time}
clr93c9wf00bv8usd26oo4yx1	finance	the finance programme from wroclaw university of economics offers a range of educational and career resources, including most prestigious and globally recognised designations in the field of finance.	oct 2024	bachelor	on campus	year		clr93aycc004w8usdekv7fcfs	2500	5.5	75	3	aug 2024	EN	{Full-time}
clr93ca3l00bw8usddoxjc2aw	biotechnology	ba in biotechnology from the john paul ii catholic university of lublin offers the choice between two specialisations: industrial biotechnology and experimental biotechnology.	oct 2024	b.a.	on campus	free		clr93axy6004n8usddmdm53eb	0	6	87	3	jul 2024	EN	{Full-time}
clr93cai800by8usd47nldt79	green technologies	green technologies students at gdansk university of technology will gain practical as well as theoretical knowledge covering all fields of green and new technologies and environmental analysis and monitoring.	oct 2024	b.sc.	on campus	year		clr93axp8004h8usdd1gfcdoj	3715	\N	72	3.5	sep 2024	EN	{Full-time}
clr93capc00bz8usdcsnl7hd4	european studies	the european studies at lazarski university degree curriculum in the field of european studies is adapted to the contemporary requirements of the labour market.	oct 2023	bachelor	on campus	year		clr93axb900488usd580n7wiv	4560	\N	\N	3	unknown	EN	{Full-time}
clr93cawk00c08usd1etoeop0	criminology and criminal justice	criminology and criminal justice fromuniversity of gdansk is an ideal choice for people who want to gain broad interdisciplinary knowledge. students of our degree course deepen knowledge related to deviant behavior, including crime in the first place.	oct 2024	bachelor	on campus	year		clr93axv8004l8usdgp9r0o1u	1944	\N	87	3	jul 2024	EN	{Full-time}
clr93cb3t00c18usd2r9uciw3	business management	this bachelor of arts in business management at university of lodz is a comprehensive programme designed to suit the needs of future management support specialists.	oct 2024	bachelor	on campus	year		clr93axhy004c8usddk0b0jql	2125	6.5	87	3	jul 2024	EN	{Full-time}
clr93cbb000c28usd3mqndale	nursing	the 3-year bachelor of science in nursing program at nicolaus copernicus university in torun is offered by the faculty of health sciences.	oct 2024	b.sc.	on campus	year		clr93axgc004b8usddaaxbcc3	3847	\N	72	3	jul 2024	EN	{Full-time}
clr93cbib00c38usd5x4h8gn9	central european and balkan studies	the central european and balkan studies programme from adam mickiewicz university poznan is dedicated to students who wish to know and understand european heritage, literary and cultural identity of europe on other civilizations background.	oct 2024	b.a.	on campus	year		clr93axts004k8usd0dpkdcml	1728	\N	\N	3	jul 2024	EN	{Full-time}
clr93cbpp00c48usd84f3epzl	information technology	lodz university of technology offers a degree in information technology. each student of the international faculty of engineering (ife), as part of the curriculum, completes at least one semester (6th semester) - "mobility semester" - in a foreign university.	oct 2024	bachelor	on campus	year		clr93axcw00498usd64zu1pr9	3408	6	87	3.5	jan 2024	EN	{Full-time}
clr93cbwq00c58usd1plhgfk8	mechanical engineering	mechanical engineering graduates from silesian university of technology has knowledge from area of design methods, engineering computations, materials processing technologies, investigations methods and it techniques assisting design, manufacturing and maintenance of machines.	oct 2024	b.sc.	on campus	year		clr93axns004g8usd0l0p3hhe	4200	6	87	3.5	jul 2024	EN	{Full-time}
test1	testName 1	testDescription 1	testStartDate	bachelor	on-campus	year	testStudyProgramLink 1	test1	1000	6	80	2	testApplyDate	EN	{full-time}
test2	testName 2	testDescription 2	testStartDate	bachelor	on-campus	year	testStudyProgramLink 2	test2	1000	6	80	2	testApplyDate	EN	{full-time}
test3	testName 3	testDescription 3	testStartDate	bachelor	on-campus	year	testStudyProgramLink 3	test3	1000	6	80	2	testApplyDate	EN	{full-time}
test4	testName 4	testDescription 4	testStartDate	bachelor	on-campus	year	testStudyProgramLink 4	test4	1000	6	80	2	testApplyDate	EN	{full-time}
test5	testName 5	testDescription 5	testStartDate	bachelor	on-campus	year	testStudyProgramLink 5	test5	1000	6	80	2	testApplyDate	EN	{full-time}
\.


--
-- Data for Name: universities; Type: TABLE DATA; Schema: public; Owner: asseradmin
--

COPY public.universities (id, name, location) FROM stdin;
clr93awqm003v8usd90vacpjl	faculty of chemistry	wroclaw, poland
clr93awtf003w8usd6nuw9zz0	vistula university	warsaw, poland
clr93awuw003x8usd0g4z85dz	medical university of lodz	lódz, poland
clr93awwf003y8usd8laj7pp8	escp business school	multiple locations
clr93awxx003z8usd6h88b7o9	coventry university	wroclaw, poland
clr93awzf00408usd5umk1e89	university of wroclaw	wroclaw, poland
clr93ax1000418usd5xvz7pw5	swiss school of business and management	online
clr93ax2f00428usd3w7xbuow	warsaw university of technology	warsaw, poland
clr93ax3u00438usd11tc684q	kozminski university	warsaw, poland
clr93ax5d00448usd00a40ecl	gdansk university of physical education and sport	kazimierza wielka, poland
clr93ax6x00458usdfjw16d2o	university of warsaw	warsaw, poland
clr93ax8b00468usd2os09yty	poznan university of technology	poznan, poland
clr93ax9t00478usd9hlwcy7j	university of economics and innovation in lublin	lublin, poland
clr93axb900488usd580n7wiv	lazarski university	warsaw, poland
clr93axcw00498usd64zu1pr9	lodz university of technology	lódz, poland
clr93axea004a8usd10l9492g	warsaw university of life sciences	warsaw, poland
clr93axgc004b8usddaaxbcc3	nicolaus copernicus university in torun	toru´n, poland
clr93axhy004c8usddk0b0jql	university of lodz	lódz, poland
clr93axjc004d8usddjosbvvz	jagiellonian university	kraków, poland
clr93axks004e8usd1eynfw11	cracow university of economics	kraków, poland
clr93axme004f8usdeflj0rxo	agh university of science & technology	kraków, poland
clr93axns004g8usd0l0p3hhe	silesian university of technology	gliwice, poland
clr93axp8004h8usdd1gfcdoj	gdansk university of technology	gdansk, poland
clr93axqs004i8usddu4je3la	university of life sciences in lublin	lublin, poland
clr93axs9004j8usd62sx91k2	university of humanities and economics in lodz	lódz, poland
clr93axts004k8usd0dpkdcml	adam mickiewicz university poznan	poznan, poland
clr93axv8004l8usdgp9r0o1u	university of gdansk	gdansk, poland
clr93axwo004m8usd5ljm58bp	university of economics in katowice	katowice, poland
clr93axy6004n8usddmdm53eb	john paul ii catholic university of lublin	lublin, poland
clr93axzm004o8usd0qaz5pfa	academy of business in dabrowa górnicza	kraków, poland
clr93ay12004p8usde47xaqko	university of silesia in katowice	chorzów, poland
clr93ay2k004q8usdas499gmq	medical university of lublin	lublin, poland
clr93ay3y004r8usd4nbq5yse	poznan university of economics and business	poznan, poland
clr93ay5g004s8usd3ge09dlb	maria curie-sklodowska university	lublin, poland
clr93ay7z004t8usdgrmkcwu9	academy of business in dabrowa górnicza	dabrowa górnicza, poland
clr93ay9e004u8usd4l8b69i5	swps university of social sciences and humanities	warsaw, poland
clr93ayau004v8usdaqiff94y	rzeszow university of technology	rzeszów, poland
clr93aycc004w8usdekv7fcfs	wroclaw university of economics	wroclaw, poland
clr93ayds004x8usdf3jd26tc	medical university of bialystok	bialystok, poland
clr93ayfa004y8usd14noeh1t	medical university of warsaw	warsaw, poland
clr93aygs004z8usdhre08fj2	wroclaw university of environmental and life sciences	wroclaw, poland
clr93ayie00508usdbdo8e09x	west pomeranian business school	szczecin, poland
clr93ayju00518usd049hc4to	university of humanities and economics in lodz	online
clr93ayl700528usd39ne33c5	sopot university of applied sciences	sopot, poland
clr93aymj00538usd9y0gead6	maritime university of szczecin	szczecin, poland
clr93ayo000548usdcpx7g6t1	wroclaw university of science and technology	wroclaw, poland
clr93aypg00558usdfjwl1pxe	polonia university in czestochowa	czestochowa, poland
clr93ayqt00568usd9upo9fz3	warsaw school of economics (sgh)	warsaw, poland
clr93ays600578usdglhe6lu7	cracow university of technology	kraków, poland
clr93aytk00588usd264sgvoh	university of economy	bydgoszcz, poland
clr93ayv100598usdcmkufa9w	university of warmia and mazury in olsztyn	olsztyn, poland
clr93aywg005a8usd1jz73tas	university of opole	opole, poland
clr93ayxv005b8usd3k5w3fb4	czestochowa university of technology	czestochowa, poland
clr93ayza005c8usdbv967hzx	university of agriculture in krakow	kraków, poland
clr93az0w005d8usd1q6hffso	polish-japanese academy of information technology	warsaw, poland
clr93az2d005e8usdhwvi6796	wroclaw medical university	wroclaw, poland
test1	testName 1	testLocation 1
test2	testName 2	testLocation 2
test3	testName 3	testLocation 3
test4	testName 4	testLocation 4
test5	testName 5	testLocation 5
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: asseradmin
--

COPY public.users (id, email, password, email_verified, image, first_name, "isActive", last_name, role, sex, "createdAt", favorites, friend_list) FROM stdin;
clr93aq4a00008usd0ndtap6f	admin@admin.com	$2a$12$cN32cgyFjVuQ/.AgwSf.e.7t94ynl55dIo28znXG98fXZQwXhkJqW	2022-04-07 21:05:53.424	\N	Admin	t	1	ADMIN	\N	2024-01-11 10:51:44.375	\N	\N
test1	test1@test.com	$2a$12$r.GvXLrA/EYD9etJHorPjOJTxGStu7FmMQSfz6NoWo1zr3neKy5Te	2022-04-07 21:05:53.424	\N	Test	t	1	ACCEPTED_STUDENT	\N	2024-01-11 10:55:45.009	\N	\N
test2	test2@test.com	$2a$12$1.lmzND62AgV.LowtpI54.QiZY8Jjh4sSJIclZsx2FsNwwKq5sSLS	2022-04-07 21:05:53.424	\N	Test	t	2	ACCEPTED_STUDENT	\N	2024-01-11 10:55:46.094	\N	\N
test3	test3@test.com	$2a$12$LdVobd3VNJcTHrI8uFHYfufHerduddYDdzUD8Wr/f7HSunCF.6iOS	2022-04-07 21:05:53.424	\N	Test	t	3	ACCEPTED_STUDENT	\N	2024-01-11 10:55:47.121	\N	\N
test4	test4@test.com	$2a$12$7buoPtJ0ab117WkWIfkW/.K.qst7ta/BdSzRpCGCSmupBYa2wprjO	2022-04-07 21:05:53.424	\N	Test	t	4	ACCEPTED_STUDENT	\N	2024-01-11 10:55:48.22	\N	\N
test5	test5@test.com	$2a$12$p4RXjLu8lU9dzl3ivsL1s.hXKfo26mvOC5Z2f5zPenS.vFyN8T0KW	2022-04-07 21:05:53.424	\N	Test	t	5	ACCEPTED_STUDENT	\N	2024-01-11 10:55:49.253	\N	\N
\.


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: asseradmin
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: accounts accounts_pkey; Type: CONSTRAINT; Schema: public; Owner: asseradmin
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_pkey PRIMARY KEY (id);


--
-- Name: activation_tokens activation_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: asseradmin
--

ALTER TABLE ONLY public.activation_tokens
    ADD CONSTRAINT activation_tokens_pkey PRIMARY KEY (id);


--
-- Name: applications applications_pkey; Type: CONSTRAINT; Schema: public; Owner: asseradmin
--

ALTER TABLE ONLY public.applications
    ADD CONSTRAINT applications_pkey PRIMARY KEY (id);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: asseradmin
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- Name: disciplines_on_programs disciplines_on_programs_pkey; Type: CONSTRAINT; Schema: public; Owner: asseradmin
--

ALTER TABLE ONLY public.disciplines_on_programs
    ADD CONSTRAINT disciplines_on_programs_pkey PRIMARY KEY (discipline_id, study_program_id);


--
-- Name: disciplines disciplines_pkey; Type: CONSTRAINT; Schema: public; Owner: asseradmin
--

ALTER TABLE ONLY public.disciplines
    ADD CONSTRAINT disciplines_pkey PRIMARY KEY (id);


--
-- Name: documents documents_pkey; Type: CONSTRAINT; Schema: public; Owner: asseradmin
--

ALTER TABLE ONLY public.documents
    ADD CONSTRAINT documents_pkey PRIMARY KEY (id);


--
-- Name: educational_backgrounds educational_backgrounds_pkey; Type: CONSTRAINT; Schema: public; Owner: asseradmin
--

ALTER TABLE ONLY public.educational_backgrounds
    ADD CONSTRAINT educational_backgrounds_pkey PRIMARY KEY (id);


--
-- Name: likes likes_pkey; Type: CONSTRAINT; Schema: public; Owner: asseradmin
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_pkey PRIMARY KEY (id);


--
-- Name: notifications notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: asseradmin
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (id);


--
-- Name: personal_infos personal_infos_pkey; Type: CONSTRAINT; Schema: public; Owner: asseradmin
--

ALTER TABLE ONLY public.personal_infos
    ADD CONSTRAINT personal_infos_pkey PRIMARY KEY (id);


--
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: asseradmin
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: asseradmin
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: study_programs study_programs_pkey; Type: CONSTRAINT; Schema: public; Owner: asseradmin
--

ALTER TABLE ONLY public.study_programs
    ADD CONSTRAINT study_programs_pkey PRIMARY KEY (id);


--
-- Name: universities universities_pkey; Type: CONSTRAINT; Schema: public; Owner: asseradmin
--

ALTER TABLE ONLY public.universities
    ADD CONSTRAINT universities_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: asseradmin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: accounts_provider_provider_account_id_key; Type: INDEX; Schema: public; Owner: asseradmin
--

CREATE UNIQUE INDEX accounts_provider_provider_account_id_key ON public.accounts USING btree (provider, provider_account_id);


--
-- Name: activation_tokens_token_key; Type: INDEX; Schema: public; Owner: asseradmin
--

CREATE UNIQUE INDEX activation_tokens_token_key ON public.activation_tokens USING btree (token);


--
-- Name: applications_study_program_id_user_id_key; Type: INDEX; Schema: public; Owner: asseradmin
--

CREATE UNIQUE INDEX applications_study_program_id_user_id_key ON public.applications USING btree (study_program_id, user_id);


--
-- Name: educational_backgrounds_application_id_key; Type: INDEX; Schema: public; Owner: asseradmin
--

CREATE UNIQUE INDEX educational_backgrounds_application_id_key ON public.educational_backgrounds USING btree (application_id);


--
-- Name: likes_post_id_author_id_key; Type: INDEX; Schema: public; Owner: asseradmin
--

CREATE UNIQUE INDEX likes_post_id_author_id_key ON public.likes USING btree (post_id, author_id);


--
-- Name: personal_infos_application_id_key; Type: INDEX; Schema: public; Owner: asseradmin
--

CREATE UNIQUE INDEX personal_infos_application_id_key ON public.personal_infos USING btree (application_id);


--
-- Name: sessions_session_token_key; Type: INDEX; Schema: public; Owner: asseradmin
--

CREATE UNIQUE INDEX sessions_session_token_key ON public.sessions USING btree (session_token);


--
-- Name: users_email_key; Type: INDEX; Schema: public; Owner: asseradmin
--

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);


--
-- Name: accounts accounts_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: asseradmin
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: activation_tokens activation_tokens_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: asseradmin
--

ALTER TABLE ONLY public.activation_tokens
    ADD CONSTRAINT activation_tokens_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: applications applications_study_program_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: asseradmin
--

ALTER TABLE ONLY public.applications
    ADD CONSTRAINT applications_study_program_id_fkey FOREIGN KEY (study_program_id) REFERENCES public.study_programs(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: applications applications_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: asseradmin
--

ALTER TABLE ONLY public.applications
    ADD CONSTRAINT applications_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: comments comments_author_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: asseradmin
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_author_id_fkey FOREIGN KEY (author_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: comments comments_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: asseradmin
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: disciplines_on_programs disciplines_on_programs_discipline_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: asseradmin
--

ALTER TABLE ONLY public.disciplines_on_programs
    ADD CONSTRAINT disciplines_on_programs_discipline_id_fkey FOREIGN KEY (discipline_id) REFERENCES public.disciplines(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: disciplines_on_programs disciplines_on_programs_study_program_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: asseradmin
--

ALTER TABLE ONLY public.disciplines_on_programs
    ADD CONSTRAINT disciplines_on_programs_study_program_id_fkey FOREIGN KEY (study_program_id) REFERENCES public.study_programs(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: documents documents_application_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: asseradmin
--

ALTER TABLE ONLY public.documents
    ADD CONSTRAINT documents_application_id_fkey FOREIGN KEY (application_id) REFERENCES public.applications(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: educational_backgrounds educational_backgrounds_application_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: asseradmin
--

ALTER TABLE ONLY public.educational_backgrounds
    ADD CONSTRAINT educational_backgrounds_application_id_fkey FOREIGN KEY (application_id) REFERENCES public.applications(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: likes likes_author_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: asseradmin
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_author_id_fkey FOREIGN KEY (author_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: likes likes_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: asseradmin
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: notifications notifications_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: asseradmin
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: personal_infos personal_infos_application_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: asseradmin
--

ALTER TABLE ONLY public.personal_infos
    ADD CONSTRAINT personal_infos_application_id_fkey FOREIGN KEY (application_id) REFERENCES public.applications(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: posts posts_author_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: asseradmin
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_author_id_fkey FOREIGN KEY (author_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: sessions sessions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: asseradmin
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: study_programs study_programs_university_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: asseradmin
--

ALTER TABLE ONLY public.study_programs
    ADD CONSTRAINT study_programs_university_id_fkey FOREIGN KEY (university_id) REFERENCES public.universities(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

