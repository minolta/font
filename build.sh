ng b;docker build -t kykub/pinfont:17 .;docker push  kykub/pinfont:17
ng b -c jktest;docker build -t kykub/pinfont:jktest .;docker push  kykub/pinfont:jktest
ng b -c local;docker build -t kykub/pinfont:jktestlocal .;docker push  kykub/pinfont:jktestlocal