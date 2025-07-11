// 영화 컬렉션 관리 프로그램 (movies.js)

// 기본값 상수
const DEFAULT_GENRE = "Unknown";
const DEFAULT_DIRECTOR = "Unknown";
const DEFAULT_TITLE = "Unknown Movie";
const DEFAULT_YEAR = 0;

// 영화 컬렉션 배열
let movieCollection = [
  {
    title: "쥬라기 월드: 새로운 시작",
    director: "가렛 에드워즈",
    year: 2025,
    genre: "Horror",
  },
  {
    title: "코바야시네 메이드래곤 외로움쟁이 용",
    director: "이시하라 타츠야",
    year: 2025,
    genre: "animation",
  },
];

// 추가할 영화 객체
const newMovie = {
  title: "미션 임파서블: 파이널 레코닝",
  director: "크리스토퍼 맥쿼리",
  year: 2025,
  genre: "action",
};

// 영화 정보 유효성 검사 함수
function validateMovie(movie) {
  const validatedMovie = { ...movie };
  
  if (!validatedMovie.title) validatedMovie.title = DEFAULT_TITLE;
  if (!validatedMovie.director) validatedMovie.director = DEFAULT_DIRECTOR;
  if (!validatedMovie.year) validatedMovie.year = DEFAULT_YEAR;
  if (!validatedMovie.genre) validatedMovie.genre = DEFAULT_GENRE;
  
  return validatedMovie;
}

// 중복 영화 확인 함수
function isDuplicateMovie(collection, movie) {
  return collection.some(
    (existingMovie) => 
      existingMovie.title === movie.title && 
      existingMovie.year === movie.year
  );
}

// 영화 추가 함수 (중복 방지)
function addMovie(collection, movie) {
  const validatedMovie = validateMovie(movie);
  
  if (!isDuplicateMovie(collection, validatedMovie)) {
    collection.push(validatedMovie);
    console.log(`✓ 영화 "${validatedMovie.title}" 추가됨`);
    return true;
  } else {
    console.log(`⚠ 영화 "${movie.title}" (${movie.year})는 이미 컬렉션에 있습니다.`);
    return false;
  }
}

// 여러 영화를 특정 위치에 추가하는 함수
function addMoviesAtIndex(collection, index, ...movies) {
  const validatedMovies = movies
    .map(movie => validateMovie(movie))
    .filter(movie => !isDuplicateMovie(collection, movie));
  
  collection.splice(index, 0, ...validatedMovies);
  console.log(`✓ ${validatedMovies.length}개의 영화가 인덱스 ${index}에 추가됨`);
}

// 영화 컬렉션 출력 함수
function printMovieCollection(collection) {
  console.log("\n=== 영화 컬렉션 ===");
  
  if (collection.length === 0) {
    console.log("컬렉션이 비어있습니다.");
    return;
  }
  
  collection.forEach((movie, index) => {
    const validatedMovie = validateMovie(movie);
    console.log(
      `${index + 1}. 제목: ${validatedMovie.title} | ` +
      `감독: ${validatedMovie.director} | ` +
      `연도: ${validatedMovie.year} | ` +
      `장르: ${validatedMovie.genre}`
    );
  });
  
  console.log(`\n총 ${collection.length}개의 영화`);
}

// 장르별 영화 분류 함수
function getMoviesByGenre(collection) {
  const genreMap = {};
  
  collection.forEach(movie => {
    const validatedMovie = validateMovie(movie);
    const genre = validatedMovie.genre.toLowerCase();
    
    if (!genreMap[genre]) {
      genreMap[genre] = [];
    }
    genreMap[genre].push(validatedMovie);
  });
  
  return genreMap;
}

// 장르별 통계 출력 함수
function printGenreStatistics(collection) {
  const genreMap = getMoviesByGenre(collection);
  
  console.log("\n=== 장르별 통계 ===");
  Object.entries(genreMap).forEach(([genre, movies]) => {
    console.log(`${genre.toUpperCase()}: ${movies.length}개`);
  });
}

// 프로그램 실행
console.log("=== 영화 컬렉션 관리 프로그램 시작 ===");

// 초기 컬렉션 출력
printMovieCollection(movieCollection);

// 새 영화 추가 (중복 방지)
console.log("\n--- 새 영화 추가 ---");
addMovie(movieCollection, newMovie);
addMovie(movieCollection, newMovie); // 중복 테스트

// 여러 영화를 맨 앞에 추가
console.log("\n--- 여러 영화 추가 ---");
const additionalMovies = [
  { title: "스파이더맨: 홈커밍 2", director: "존 왓츠", year: 2025, genre: "action" },
  { title: "토이 스토리 5", director: "조시 쿨리", year: 2025, genre: "animation" }
];

additionalMovies.forEach(movie => addMovie(movieCollection, movie));

// 최종 컬렉션 출력
printMovieCollection(movieCollection);

// 장르별 통계 출력
printGenreStatistics(movieCollection);

console.log("\n=== 프로그램 종료 ===");