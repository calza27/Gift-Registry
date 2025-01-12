#!/usr/bin/env bash
die() {
  ls ./out && rm -rf ./out
  echo "${1:-urgh}" >&2;
  exit "${2:-1}";
}

hash aws 2>/dev/null || die "missing dep: aws"
hash sam 2>/dev/null || die "missing dep: sam"
hash ./bin/parse-yaml.sh || die "parse-yaml.sh not found."

profile=$1
[[ -z $profile ]] && die "Usage: $0 <profile>"

websiteBucketName=$(aws ssm get-parameter --profile "${profile}" --name "/gift-registry/s3/website/name" --query "Parameter.Value" --output text)
if [[ -z $websiteBucketName ]]; then
  die "failed to get name of website bucket"
fi

echo "~~~ Build the site stack"
npm run build || die "failed to build site"
aws s3 cp "./out" "s3://$websiteBucketName" --recursive --profile "${profile}" || die "failed to upload to bucket"

die "~~ cleaning up" 0