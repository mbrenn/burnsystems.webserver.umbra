CS_FILES = $(shell find src/ -type f -name *.cs)

all: bin/BurnSystems.Webserver.Umbra.dll


.PHONY: build_burnsystems
build_burnsystems:
	make -C packages/burnsystems

.PHONY: build_burnsystems_parser
build_burnsystems_parser:
	make -C packages/burnsystems.parser

.PHONY: build_burnsystems_webserver
build_burnsystems_webserver:
	make -C packages/burnsystems.webserver

packages/bin/BurnSystems.dll: packages/burnsystems/bin/BurnSystems.dll
	mkdir -p packages/bin
	cp packages/burnsystems/bin/* packages/bin/

packages/bin/BurnSystems.Parser.dll: packages/burnsystems/bin/BurnSystems.dll
	mkdir -p packages/bin
	cp packages/burnsystems.parser/bin/* packages/bin/

packages/bin/BurnSystems.WebServer.dll: packages/burnsystems/bin/BurnSystems.dll packages/burnsystems/bin/BurnSystems.Parser.dll
	mkdir -p packages/bin
	cp packages/burnsystems.webserver/bin/* packages/bin/


bin/BurnSystems.Webserver.Umbra.dll: $(CS_FILES)
	xbuild src/BurnSystems.WebServer.Umbra/BurnSystems.WebServer.Umbra.csproj
	mkdir -p bin/
	mkdir -p bin/htdocs
	cp src/BurnSystems.WebServer.Umbra/bin/Debug/* bin/
	cp -r src/BurnSystems.WebServer.Umbra/htdocs/* bin/htdocs/

clean:
	rm -rf bin
	rm -rf src/BurnSystems.WebServer.Umbra/bin
