#!/bin/sh

arg_num=$#;
handle=$1;
env=$2;
commit=$3;
commit_num=3

# 远程部署机 webhook
# 如果用远程机器部署的话就要用到以下方法
# preHandle(){
#     git pull orgin master
#     npm config set registry http://registry.npm.taobao.org/
#     npm install
#     npm run build-prod
# }
# 提交代码
gitPush(){
    # 获取值
    git_status=$(git status)
    # 获取长度
    git_status_len=${#git_status}
    git_status_cut_tail=${git_status%%nothing added to commit*}
    git_status_cut_tail_cut_head=${git_status_cut_tail##*will be committed)}
    git_status_cut_tail_cut_head_len=${#git_status_cut_tail_cut_head}

    #check nothing
    check_nothing=$(echo $git_status_cut_tail_cut_head | grep "nothing to commit, working directory clean")
    if [ ${#check_nothing} != 0 ];then
        echo "nothing to commit"
    else
        #check changes to be committed
        git add .
        git commit -m "$commit"
        git push
    fi
}

if [ $handle == "build" ]
then
    if [ $env == "prod" ]
    then
        env='prod'
        echo "[exec]build ==> build production"
        # npm run dll
        npm run build-prod
    else
        env='dev'
        echo "[exec]build ==> build development"
        # npm run dll
        npm run build
    fi
fi

if [ $arg_num -eq $commit_num ]
then
    gitPush
else
    echo "no git push"
fi
