#!/bin/bash

# This is a script generating protobuf into javascript (common js format).

# shopt -s globstar

# Terminal color
RED='\033[0;31m'
NC='\033[0m' # No color

# The absolute path of the top-level directory.
REPO_DIR=${REPO_DIR:-$(git rev-parse --show-toplevel)}
[[ -n $REPO_DIR ]] || (
  echo >&2 "Failed to find working directory"
  exit 1
)

cd $REPO_DIR
PROTOC_DIR=$REPO_DIR/tools/proto
mkdir -p $PROTOC_DIR

# Sets up protoc.
PROTOC_FILE=$PROTOC_DIR/bin/protoc
PROTOC_LOCAL_STRING=$(which protoc)

if [[ ${PROTOC_LOCAL_STRING} == *"/bin/"* ]]; then
  PROTOC_FILE=$PROTOC_LOCAL_STRING
else
  if [ ! -f "$PROTOC_FILE" ]; then
    echo "$PROTOC_FILE does not exist, downloading ..."
    VERSION=3.11.4
    ARCHIVE=protoc-$VERSION-linux-x86_64
    curl -L -O https://github.com/protocolbuffers/protobuf/releases/download/v$VERSION/$ARCHIVE.zip
    unzip -d "$PROTOC_DIR" $ARCHIVE.zip 'bin/*' 'include/*'
    rm -rf $ARCHIVE.zip
    EXE_PROTOC=tools/proto/bin/protoc
  fi
fi

# Sets up protoc-gen-grpc-web.
if ! command -v protoc-gen-grpc-web &> /dev/null; then
  /usr/bin/printf "${RED}\xE2\x9D\x8C protoc-gen-grpc-web need to be installed${NC}, please run:\n"
  echo "npm install -g protoc-gen-grpc-web"
  echo "-----------or----------"
  echo "sudo wget https://github.com/grpc/grpc-web/releases/download/1.2.0/protoc-gen-grpc-web-1.2.0-linux-x86_64 -O /usr/bin/protoc-gen-grpc-web"
  echo "sudo chmod a+x /usr/bin/protoc-gen-grpc-web"
  echo "exit 1"
  exit 1
fi

CORE_API_DIR=$REPO_DIR/node_modules/dm-core-apis
RST="$(
  $PROTOC_FILE \
    $(find $CORE_API_DIR/proto -iname "*.proto") \
    --proto_path=$CORE_API_DIR \
    --js_out=import_style=commonjs,binary:$CORE_API_DIR/ \
    --grpc-web_out=import_style=commonjs,mode=grpcwebtext:$CORE_API_DIR/ \
    2>&1
)"
if [[ ${RST} != *"error"* ]];then
  /usr/bin/printf "\xE2\x9C\x94 protos generated.\n"
else
  /usr/bin/printf "\xE2\x9D\x8C protos generation failed with errors.\n"
fi
echo ""
echo "generation result:"
echo $RST
