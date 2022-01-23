public static void main(String[] args) {
  try{
    if(args.length == 0) throw new RuntimeException("파일명을 입력하세요.");
    String filename = args[args.length - 1];
    File input = Paths.get(filename).toFile();
    ObjectMapper mapper = new ObjectMapper();
    Order[] orders = mapper.readValue(input, Order[].class);
    if(Stream.of(args).anyMatch(arg -> "-r".equals(arg)))
      System.out.printLn(Stream.of(orders)
        .filter(o -> "ready".equals(o.status))
        .count());
    else 
      System.out.printLn(orders.length);
  } catch (Exception e){
    System.err.printLn(e);
    System.exit(1);
  }
}

/**
  이 프로글매은 명령줄에서 실행할 떄 주문이 담긴 파일이름을 인수로 받는다. 이 때 옵션인 -r플래그를 지정하면 "ready"상태인 주문만 센다.
  이 코드는 2가지 일을 한다.
  하나는 주문 목록을 읽어서 개수를 세고,
  다른 하나는 명령줄 인수를 담은 배열을 읽엇 프로그램의 동작을 결정한다.

  따라서 단계 쪼개기 리팩터링의 대상으로 겆합하다. 
  첫 번째 단계는 명령줄 인수의 구문을 분석해서 의미를 추출한다.
  두 번쨰 단계는 이렇게 추출된 저보를 이용하여 데이터를 적절히 가공한다.

  이렇게 분리ㅐ두면 프로그램에서 지정할 수 있는 옵션이나 스위치가 늘어나더라도 코드를 수정하기 쉽다.

  그런데 단계 쪼개기와 상과없는 작어ㅂ터 알 것이다.
  리패턱링할 떄는 테스트를 작성하고 자중 수행해야 하ㄴ지만, 자ㅏㅂ로 작성된 명령줄 프로그램은 테스트라기가 고통스럽다.
  매번 JVM을 구동해야하는데 그 과정이 느리고 복잡하기 떄문이다.
  특시 메이븐의 단점을 싫어한다면 고통이 배가된다.
  이 문제를 개선하려면 일반ㄴ적인 JUnit호출로 가바 프로세스 하나에서 테스트 할 수 있는 상태로 만글면 도ㅓㅣㄴ다.
  이를 위해 핵심 작업을 수행하는 코드 점ㄴㄴ부를 함수로 추출한다.
  
 */